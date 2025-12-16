import React, { useState } from 'react';
import { analyzeToolImage } from '../services/geminiService';
import { AIAnalysisResult, Tool } from '../types';

interface GeminiScannerProps {
  onClose: () => void;
  selectedTool?: Tool;
}

const GeminiScanner: React.FC<GeminiScannerProps> = ({ onClose, selectedTool }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        setAnalyzing(true);
        setResult(null);
        
        // Strip data:image/jpeg;base64, from the string for the API
        const base64Data = base64String.split(',')[1];
        
        try {
          const analysis = await analyzeToolImage(base64Data);
          setResult(analysis);
        } catch (err) {
          console.error(err);
        } finally {
          setAnalyzing(false);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">🤖</span> AI Tool Inspector
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {!preview ? (
              <label className="border-2 border-dashed border-slate-600 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700/50 hover:border-blue-500 transition-all group">
                <div className="p-4 bg-slate-700 rounded-full mb-3 group-hover:bg-blue-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm text-slate-400 font-medium">Take Photo or Upload</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-slate-600">
                <img src={preview} alt="Scan preview" className="w-full object-cover max-h-64" />
                {analyzing && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <span className="text-blue-400 font-semibold animate-pulse">Analyzing Condition...</span>
                  </div>
                )}
              </div>
            )}

            {result && (
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white">{result.toolName}</h3>
                    <p className="text-xs text-slate-400">Confidence: {result.confidenceScore}%</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    result.condition === 'Good' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                    result.condition === 'Fair' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' :
                    'bg-red-500/20 text-red-400 border-red-500/50'
                  }`}>
                    {result.condition}
                  </span>
                </div>
                
                <div className="text-sm text-slate-300">
                  <p className="mb-2"><strong className="text-slate-500">Analysis:</strong> {result.description}</p>
                  <p><strong className="text-slate-500">Recommendation:</strong> {result.maintenanceSuggestion}</p>
                </div>

                <div className="pt-2 flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                    Update Condition
                  </button>
                  <button onClick={() => { setPreview(null); setResult(null); }} className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700">
                    Scan Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiScanner;