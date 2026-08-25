"use client";

import { useSession } from "@/context/SessionContext";
import Container from "@/components/ui/Container";
import { FileText, Upload, Plus, ExternalLink, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export default function DocumentCenterPage() {
  const { user, dispatch } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!user) return null;

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setIsUploading(true);
    
    // Simulate network upload
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      dispatch({ type: "UPLOAD_DOCUMENT", payload: { name: file.name } });
      
      // Reset success state after a few seconds
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 1500);
  };

  const digilockerDocs = user.documents.filter(d => d.source === "digilocker");
  const uploadedDocs = user.documents.filter(d => d.source === "upload");
  const employerDocs = user.documents.filter(d => d.source === "employer");

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === "available") return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    if (status === "needs_attention") return <AlertCircle className="h-4 w-4 text-red-500" />;
    return <Clock className="h-4 w-4 text-amber-500" />;
  };

  return (
    <Container className="py-12 max-w-4xl">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 mb-2">Document Center</h1>
          <p className="text-slate-500">Manage documents used for KYC, claim verification, and identity proof.</p>
        </div>
        
        <div className="relative">
          <input
            type="file"
            id="doc-upload"
            className="hidden"
            onChange={handleSimulatedUpload}
            disabled={isUploading}
          />
          <label
            htmlFor="doc-upload"
            className={`flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors cursor-pointer ${isUploading ? 'opacity-70 pointer-events-none' : ''}`}
          >
            {isUploading ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload Document
              </>
            )}
          </label>
        </div>
      </div>

      <AnimatePresence>
        {uploadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg flex items-center gap-3"
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <p className="text-sm font-medium">Document uploaded successfully. It is now available for claims.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8">
        
        {/* Connected Services */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="font-display font-semibold text-lg text-slate-900">DigiLocker Connected</h2>
            </div>
            {!user.digiLockerConnected && (
              <Link href="/dashboard/connected-services" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
                Connect <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
          
          <div className="p-0">
            {!user.digiLockerConnected ? (
              <div className="px-5 py-8 text-center bg-slate-50">
                <p className="text-sm text-slate-500 mb-4">Connect DigiLocker to securely fetch your Aadhaar, PAN, and other official documents.</p>
                <Link href="/dashboard/connected-services">
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" /> Connect DigiLocker
                  </Button>
                </Link>
              </div>
            ) : (
              <div>
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center text-xs text-slate-500">
                  <span>Last synced: {user.digiLockerSyncDate}</span>
                  <Badge tone="success" className="bg-emerald-100 text-emerald-800 border-transparent">Connected</Badge>
                </div>
                <ul className="divide-y divide-slate-100">
                  {digilockerDocs.length > 0 ? digilockerDocs.map(doc => (
                    <li key={doc.id} className="px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <StatusIcon status={doc.status} />
                        <div>
                          <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">Added {doc.dateAdded}</p>
                        </div>
                      </div>
                      {doc.status === "needs_attention" && (
                        <Badge tone="error">Needs Attention</Badge>
                      )}
                    </li>
                  )) : (
                    <li className="px-5 py-6 text-center text-sm text-slate-500">No documents found in DigiLocker.</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Uploaded Documents */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 p-5">
              <h2 className="font-display font-semibold text-lg text-slate-900">Your Uploads</h2>
            </div>
            <ul className="divide-y divide-slate-100">
              {uploadedDocs.length > 0 ? uploadedDocs.map(doc => (
                <li key={doc.id} className="px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <StatusIcon status={doc.status} />
                    <div>
                      <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{doc.dateAdded}</p>
                    </div>
                  </div>
                </li>
              )) : (
                <li className="px-5 py-8 text-center text-sm text-slate-500 bg-slate-50">
                  No documents uploaded manually.
                </li>
              )}
            </ul>
          </section>

          {/* Employer Documents */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 p-5">
              <h2 className="font-display font-semibold text-lg text-slate-900">Employer Documents</h2>
            </div>
            <ul className="divide-y divide-slate-100">
              {employerDocs.length > 0 ? employerDocs.map(doc => (
                <li key={doc.id} className="px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <StatusIcon status={doc.status} />
                    <div>
                      <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{doc.dateAdded}</p>
                    </div>
                  </div>
                </li>
              )) : (
                <li className="px-5 py-8 text-center text-sm text-slate-500 bg-slate-50">
                  No documents provided by employer.
                </li>
              )}
            </ul>
          </section>
        </div>
        
        <div className="p-4 bg-slate-50 rounded-lg text-xs text-slate-500 border border-slate-200 text-center">
          <strong>Prototype Note:</strong> Document upload and DigiLocker sync are simulated. No actual files are stored or transmitted.
        </div>

      </div>
    </Container>
  );
}
