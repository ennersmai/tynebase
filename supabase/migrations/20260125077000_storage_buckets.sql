-- Migration: Create Storage Buckets with RLS
-- Task: 1.11 - Create tenant-uploads and tenant-documents buckets
-- Security: Enforce tenant isolation via RLS policies on file paths

-- Create tenant-uploads bucket for temporary uploads (videos, PDFs, etc.)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'tenant-uploads',
  'tenant-uploads',
  false,
  104857600, -- 100MB limit
  ARRAY[
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'application/pdf',
    'text/plain',
    'text/markdown',
    'text/html'
  ]
);

-- Create tenant-documents bucket for processed documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'tenant-documents',
  'tenant-documents',
  false,
  52428800, -- 50MB limit
  ARRAY[
    'application/pdf',
    'text/plain',
    'text/markdown',
    'application/json'
  ]
);

-- Policy: Users can upload files to their tenant's folder in tenant-uploads
-- File path format: tenant-{tenant_id}/filename.ext
CREATE POLICY "tenant_uploads_insert_policy"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'tenant-uploads'
  AND (storage.foldername(name))[1] = CONCAT('tenant-', auth.jwt() ->> 'tenant_id')
);

-- Policy: Users can read files from their tenant's folder in tenant-uploads
CREATE POLICY "tenant_uploads_select_policy"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'tenant-uploads'
  AND (storage.foldername(name))[1] = CONCAT('tenant-', auth.jwt() ->> 'tenant_id')
);

-- Policy: Users can update files in their tenant's folder in tenant-uploads
CREATE POLICY "tenant_uploads_update_policy"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'tenant-uploads'
  AND (storage.foldername(name))[1] = CONCAT('tenant-', auth.jwt() ->> 'tenant_id')
);

-- Policy: Users can delete files from their tenant's folder in tenant-uploads
CREATE POLICY "tenant_uploads_delete_policy"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'tenant-uploads'
  AND (storage.foldername(name))[1] = CONCAT('tenant-', auth.jwt() ->> 'tenant_id')
);

-- Policy: Users can upload files to their tenant's folder in tenant-documents
CREATE POLICY "tenant_documents_insert_policy"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'tenant-documents'
  AND (storage.foldername(name))[1] = CONCAT('tenant-', auth.jwt() ->> 'tenant_id')
);

-- Policy: Users can read files from their tenant's folder in tenant-documents
CREATE POLICY "tenant_documents_select_policy"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'tenant-documents'
  AND (storage.foldername(name))[1] = CONCAT('tenant-', auth.jwt() ->> 'tenant_id')
);

-- Policy: Users can update files in their tenant's folder in tenant-documents
CREATE POLICY "tenant_documents_update_policy"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'tenant-documents'
  AND (storage.foldername(name))[1] = CONCAT('tenant-', auth.jwt() ->> 'tenant_id')
);

-- Policy: Users can delete files from their tenant's folder in tenant-documents
CREATE POLICY "tenant_documents_delete_policy"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'tenant-documents'
  AND (storage.foldername(name))[1] = CONCAT('tenant-', auth.jwt() ->> 'tenant_id')
);
