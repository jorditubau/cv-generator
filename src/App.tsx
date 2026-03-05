import React, { useState, useEffect, useRef } from 'react';
import {
  User, FileText, Briefcase, GraduationCap, Wrench, Rocket, Award,
  Undo2, Redo2, Link2, Download, FileDown, Check, Loader2,
} from 'lucide-react';
import { useCVStore } from './store/cvStore';
import { useAutoSave, loadSavedCV } from './hooks/useAutoSave';
import { usePDFExport } from './hooks/usePDFExport';
import { encodeCVToUrl, decodeCVFromUrl } from './utils/urlEncoder';
import { sampleCVData } from './utils/sampleData';
import { PersonalInfo } from './components/form/PersonalInfo';
import { Summary } from './components/form/Summary';
import { Experience } from './components/form/Experience';
import { Education } from './components/form/Education';
import { Skills } from './components/form/Skills';
import { Projects } from './components/form/Projects';
import { Certifications } from './components/form/Certifications';
import { CVPreview } from './components/preview/CVPreview';
import { ColorPicker } from './components/ui/ColorPicker';
import { TemplateType } from './types/cv.types';
import { useTranslation } from './i18n/LanguageContext';

type Section = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications';

export default function App() {
  const {
    cvData, settings,
    setTemplate, setAccentColor,
    loadCV, undo, redo, canUndo, canRedo,
    getCompletionPercentage,
  } = useCVStore();

  const { lang, setLang, tr } = useTranslation();

  const SECTIONS: { id: Section; label: string; Icon: React.ElementType }[] = [
    { id: 'personal',       label: tr.sections.personal,       Icon: User },
    { id: 'summary',        label: tr.sections.summary,        Icon: FileText },
    { id: 'experience',     label: tr.sections.experience,     Icon: Briefcase },
    { id: 'education',      label: tr.sections.education,      Icon: GraduationCap },
    { id: 'skills',         label: tr.sections.skills,         Icon: Wrench },
    { id: 'projects',       label: tr.sections.projects,       Icon: Rocket },
    { id: 'certifications', label: tr.sections.certifications, Icon: Award },
  ];

  const TEMPLATES: { id: TemplateType; label: string; desc: string }[] = [
    { id: 'classic', label: tr.templates.classic, desc: tr.templates.classicDesc },
    { id: 'modern',  label: tr.templates.modern,  desc: tr.templates.modernDesc },
    { id: 'minimal', label: tr.templates.minimal, desc: tr.templates.minimalDesc },
  ];

  const [activeSection, setActiveSection] = useState<Section>('personal');
  const [copied, setCopied] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle');
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(0.6);
  const { previewRef, downloadPDF, isExporting } = usePDFExport();

  useEffect(() => {
    const fromUrl = decodeCVFromUrl();
    if (fromUrl) {
      loadCV(fromUrl);
      window.history.replaceState(null, '', window.location.pathname);
    } else {
      const saved = loadSavedCV();
      if (saved) loadCV(saved);
    }
  }, []);

  useAutoSave(cvData);
  useEffect(() => {
    setSaveStatus('saving');
    const t = setTimeout(() => setSaveStatus('saved'), 2500);
    return () => clearTimeout(t);
  }, [cvData]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo()) undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        if (canRedo()) redo();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [undo, redo, canUndo, canRedo]);

  useEffect(() => {
    const measure = () => {
      if (!previewContainerRef.current) return;
      const containerWidth = previewContainerRef.current.clientWidth - 32;
      const a4WidthPx = (210 / 25.4) * 96;
      setPreviewScale(Math.min(1, containerWidth / a4WidthPx));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const copyShareableLink = async () => {
    const url = encodeCVToUrl(cvData);
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const completion = getCompletionPercentage();
  const a4HeightPx = (297 / 25.4) * 96;

  return (
    <div className="flex flex-col h-screen bg-gray-50 transition-colors">
      {/* Navbar */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-2.5 flex items-center gap-3 shadow-sm z-10">
        <div className="flex items-center gap-2 mr-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <h1 className="font-bold text-gray-900 text-lg tracking-tight">CVCraft</h1>
        </div>

        {/* Save status */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mr-2">
          {saveStatus === 'saving' ? (
            <><span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /><span>{tr.nav.saving}</span></>
          ) : saveStatus === 'saved' ? (
            <><span className="w-2 h-2 rounded-full bg-green-400" /><span>{tr.nav.saved}</span></>
          ) : null}
        </div>

        {/* Completion */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600 mr-2">
          <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
          <span className="font-medium">{completion}{tr.nav.complete}</span>
        </div>

        <div className="flex-1" />

        {/* Load example */}
        <button
          onClick={() => loadCV(sampleCVData)}
          className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <FileDown className="w-3.5 h-3.5" />
          {tr.nav.loadExample}
        </button>

        {/* Undo/Redo */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={undo}
            disabled={!canUndo()}
            title={tr.nav.undoTitle}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo()}
            title={tr.nav.redoTitle}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Language selector */}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as 'es' | 'en')}
          className="px-2 py-1.5 rounded-lg text-xs font-semibold text-gray-600 border border-gray-200 bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
        >
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>

        {/* Share */}
        <button
          onClick={copyShareableLink}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-violet-600 px-3 py-1.5 rounded-lg hover:bg-violet-50 transition-colors"
        >
          {copied
            ? <><Check className="w-3.5 h-3.5 text-green-500" /> {tr.nav.copied}</>
            : <><Link2 className="w-3.5 h-3.5" /> {tr.nav.share}</>
          }
        </button>

        {/* Download PDF */}
        <button
          onClick={() => downloadPDF(`${cvData.personalInfo.fullName || 'cv'}.pdf`)}
          disabled={isExporting}
          className="flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 px-3 py-1.5 rounded-lg shadow-sm disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {isExporting
            ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> {tr.nav.generating}</>
            : <><Download className="w-3.5 h-3.5" /> {tr.nav.downloadPDF}</>
          }
        </button>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-full lg:w-[42%] flex flex-col border-r border-gray-200 bg-white overflow-hidden">
          {/* Section Nav */}
          <div className="flex-shrink-0 border-b border-gray-100 px-2 py-2 overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {SECTIONS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    activeSection === id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {activeSection === 'personal'       && <PersonalInfo />}
            {activeSection === 'summary'        && <Summary />}
            {activeSection === 'experience'     && <Experience />}
            {activeSection === 'education'      && <Education />}
            {activeSection === 'skills'         && <Skills />}
            {activeSection === 'projects'       && <Projects />}
            {activeSection === 'certifications' && <Certifications />}
          </div>
        </div>

        {/* Right Panel — Preview */}
        <div className="hidden lg:flex flex-col flex-1 bg-gray-100 overflow-hidden">
          <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-2.5 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  title={t.desc}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    settings.template === t.id
                      ? 'bg-gray-900 text-white shadow'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {settings.template !== 'classic' && (
              <ColorPicker value={settings.accentColor} onChange={setAccentColor} label={tr.templates.accent} />
            )}

            <div className="flex-1" />
            <span className="text-xs text-gray-400 font-medium">{tr.nav.livePreview}</span>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div ref={previewContainerRef} className="w-full h-full">
              <div
                className="relative mx-auto shadow-2xl rounded overflow-hidden bg-white"
                style={{
                  width: `${793.7 * previewScale}px`,
                  height: `${a4HeightPx * previewScale}px`,
                  minHeight: `${a4HeightPx * previewScale}px`,
                }}
              >
                <div style={{ transform: `scale(${previewScale})`, transformOrigin: 'top left', width: '793.7px' }}>
                  <CVPreview ref={previewRef} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
