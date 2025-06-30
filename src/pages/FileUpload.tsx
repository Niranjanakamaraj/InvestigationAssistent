import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Upload,
  FileText,
  FileSpreadsheet,
  File,
  X,
  Check,
} from 'lucide-react';
import * as XLSX from 'xlsx';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  icon: typeof FileText;
  rawFile: File;
  metadata: {
    fileName: string;
    documentType: string;
    definition: string;
    intelligenceLevel: string;
  };
  previewData?: string;
}

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
      case 'docx':
      case 'json':
      case 'doc':
        return FileText;
      case 'xlsx':
      case 'xls':
        return FileSpreadsheet;
      default:
        return File;
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFiles = async (files: File[]) => {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/json',
    ];

    for (const file of files) {
      if (
        validTypes.includes(file.type) ||
        ['.pdf', '.docx', '.xlsx', '.json'].some(ext => file.name.endsWith(ext))
      ) {
        let previewData = '';

        if (file.type === 'application/json') {
          const text = await file.text();
          previewData = JSON.stringify(JSON.parse(text), null, 2);
        } else if (
          file.name.endsWith('.xlsx') ||
          file.name.endsWith('.xls')
        ) {
          const data = await file.arrayBuffer();
          const workbook = XLSX.read(data, { type: 'array' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          previewData = JSON.stringify(json, null, 2);
        }

        const newFile: UploadedFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.type,
          size: file.size,
          icon: getFileIcon(file.name),
          rawFile: file,
          metadata: {
            fileName: file.name,
            documentType: 'Evidence',
            definition: '',
            intelligenceLevel: 'Medium',
          },
          previewData,
        };
        setUploadedFiles(prev => [...prev, newFile]);
        toast({ title: 'File added', description: `${file.name} ready.` });
      } else {
        toast({
          title: 'Unsupported file',
          description: `${file.name} is not supported.`,
          variant: 'destructive',
        });
      }
    }
  };

  const updateFileMetadata = (fileId: string, field: string, value: string) => {
    setUploadedFiles(prev =>
      prev.map(file =>
        file.id === fileId
          ? { ...file, metadata: { ...file.metadata, [field]: value } }
          : file
      )
    );
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const goToCopilot = () => {
    navigate('/copilot');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            File Upload & Metadata
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Upload your investigation documents and configure their metadata for AI analysis.
          </p>
        </div>

        <Card className="gradient-card mb-8 animate-slide-up">
          <div
            className={`p-12 border-2 border-dashed rounded-2xl transition-all duration-300 ${
              dragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <Upload className={`mx-auto h-16 w-16 mb-4 ${dragActive ? 'text-blue-500' : 'text-gray-400'} transition-colors duration-300`} />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Drop your files here
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Support for PDF, Word, Excel, and JSON documents
              </p>
              <Button onClick={() => document.getElementById('file-input')?.click()}>
                Choose Files
              </Button>
              <input
                id="file-input"
                type="file"
                multiple
                accept=".pdf,.docx,.xlsx,.json"
                className="hidden"
                onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
              />
            </div>
          </div>
        </Card>

        {uploadedFiles.length > 0 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Uploaded Files ({uploadedFiles.length})
            </h2>

            <div className="grid gap-6">
              {uploadedFiles.map((file, index) => {
                const Icon = file.icon;
                return (
                  <Card key={file.id} className="gradient-card p-6 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{file.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>File Name</Label>
                        <Input
                          value={file.metadata.fileName}
                          onChange={(e) => updateFileMetadata(file.id, 'fileName', e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Document Type</Label>
                        <Select
                          value={file.metadata.documentType}
                          onValueChange={(val) => updateFileMetadata(file.id, 'documentType', val)}
                        >
                          <SelectTrigger className="rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Evidence">Evidence</SelectItem>
                            <SelectItem value="Report">Report</SelectItem>
                            <SelectItem value="Statement">Statement</SelectItem>
                            <SelectItem value="Financial">Financial</SelectItem>
                            <SelectItem value="Communication">Communication</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Definition</Label>
                        <Input
                          value={file.metadata.definition}
                          onChange={(e) => updateFileMetadata(file.id, 'definition', e.target.value)}
                          placeholder="Brief description..."
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Intelligence Level</Label>
                        <Select
                          value={file.metadata.intelligenceLevel}
                          onValueChange={(val) => updateFileMetadata(file.id, 'intelligenceLevel', val)}
                        >
                          <SelectTrigger className="rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Label className="block mb-1">Preview</Label>
                      {file.type === 'application/pdf' && (
                        <iframe
                          title={file.name}
                          src={URL.createObjectURL(file.rawFile)}
                          className="w-full h-64 rounded-xl border"
                        />
                      )}
                      {file.type === 'application/json' || file.name.endsWith('.xlsx') || file.name.endsWith('.xls') ? (
                        <pre className="bg-gray-100 dark:bg-gray-800 text-sm p-4 rounded-xl overflow-auto">
                          {file.previewData}
                        </pre>
                      ) : null}
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-6">
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                <Check className="w-5 h-5" />
                <span className="font-medium">{uploadedFiles.length} files ready</span>
              </div>

              <Button onClick={goToCopilot} className="gradient-button px-8 py-3 text-lg">
                Continue to Co-Pilot →
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
