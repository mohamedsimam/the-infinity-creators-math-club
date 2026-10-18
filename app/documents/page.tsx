'use client';

import { useState, useEffect } from 'react';
import { loadData } from '../lib/data';
import { PageHero, AnimateOnScroll } from '../components/Animations';
import {
  FolderIcon,
  BuildingIcon,
  FileTextIcon,
  CalendarIcon,
  BookOpenIcon,
  BarChartIcon,
  EyeIcon,
} from '../components/Icons';
import type { ClubData } from '../lib/data';

const DOC_CATEGORIES = [
  { key: 'All', label: 'All Documents', icon: FolderIcon },
  { key: 'Club governance', label: 'Club Governance', icon: BuildingIcon },
  { key: 'Planning and administration', label: 'Planning & Admin', icon: FileTextIcon },
  { key: 'Event documentation', label: 'Event Documentation', icon: CalendarIcon },
  { key: 'Finance documentation', label: 'Finance', icon: BarChartIcon },
  { key: 'Academic resources', label: 'Academic Resources', icon: BookOpenIcon },
  { key: 'Annual records', label: 'Annual Records', icon: FileTextIcon },
];

const DOC_SUBCATEGORIES: Record<string, string[]> = {
  'Club governance': ['Club constitution', 'Rules and regulations', 'Membership guidelines', 'Organizational structure', 'Roles and responsibilities'],
  'Planning and administration': ['Annual action plan', 'Annual calendar', 'Meeting agendas', 'Meeting minutes', 'Committee decisions', 'Activity proposals', 'Permission letters', 'Official notices'],
  'Event documentation': ['Event proposals', 'Event plans', 'Programs and schedules', 'Attendance summaries', 'Event reports', 'Photographs and evidence', 'Feedback reports'],
  'Finance documentation': ['Approved budgets', 'Income and expenditure', 'Treasurer reports', 'Financial statements'],
  'Academic resources': ['Mathematics worksheets', 'Quiz papers', 'Problem-solving resources', 'Presentations', 'Learning materials', 'Student project reports'],
  'Annual records': ['Annual reports', 'Committee lists', 'Achievement records', 'Membership summaries', 'Year-end reviews', 'Future plans'],
};

export default function DocumentsPage() {
  const [data, setData] = useState<ClubData | null>(null);
  const [catFilter, setCatFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => { setData(loadData()); }, []);
  if (!data) return null;

  let docs = data.documents.filter(d => d.status === 'published');
  if (catFilter !== 'All') docs = docs.filter(d => d.category === catFilter);
  if (search) {
    const q = search.toLowerCase();
    docs = docs.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.documentId.toLowerCase().includes(q)
    );
  }

  const renderDocIcon = (fileType: string) => {
    if (fileType?.includes('sheet') || fileType?.includes('xls')) {
      return <BarChartIcon size={24} color="var(--color-math-blue)" />;
    }
    if (fileType?.includes('book') || fileType?.includes('resource')) {
      return <BookOpenIcon size={24} color="var(--color-math-blue)" />;
    }
    return <FileTextIcon size={24} color="var(--color-math-blue)" />;
  };

  return (
    <>
      <PageHero
        title="Official Documentation Centre"
        subtitle="The digital documentation library of The Infinity Creators"
        badge="Documents"
        badgeIcon={<FolderIcon size={16} />}
      />

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          {/* Search */}
          <AnimateOnScroll>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
              <div className="search-wrapper">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search documents by title, ID, or description..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          </AnimateOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 'var(--space-xl)', alignItems: 'flex-start' }}>
            {/* Sidebar Categories */}
            <AnimateOnScroll>
              <div style={{
                background: 'var(--color-light-bg)', borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border-light)', padding: 'var(--space-md)',
                position: 'sticky', top: 'calc(var(--nav-height) + 1rem)',
              }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: 'var(--space-md)', padding: '0 var(--space-sm)' }}>
                  Categories
                </h4>
                {DOC_CATEGORIES.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setCatFilter(cat.key)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%',
                        padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)',
                        fontSize: '0.85rem', fontWeight: catFilter === cat.key ? 600 : 400,
                        color: catFilter === cat.key ? 'var(--color-math-blue)' : 'var(--color-text-secondary)',
                        background: catFilter === cat.key ? 'rgba(37,99,235,0.06)' : 'transparent',
                        border: 'none', cursor: 'pointer', textAlign: 'left',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <Icon size={15} color={catFilter === cat.key ? 'var(--color-math-blue)' : 'currentColor'} />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </AnimateOnScroll>

            {/* Document List */}
            <div>
              {/* Category Header with Subcategories */}
              {catFilter !== 'All' && DOC_SUBCATEGORIES[catFilter] && (
                <AnimateOnScroll>
                  <div style={{
                    background: 'var(--color-light-bg)', borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-md)', marginBottom: 'var(--space-lg)',
                    border: '1px solid var(--color-border-light)',
                  }}>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      {catFilter} — Subcategories
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {DOC_SUBCATEGORIES[catFilter].map(sub => (
                        <span key={sub} style={{
                          fontSize: '0.75rem', padding: '2px 10px', borderRadius: '999px',
                          background: 'rgba(37,99,235,0.06)', color: 'var(--color-text-secondary)',
                        }}>
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              )}

              {docs.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  {docs.map((doc, i) => (
                    <AnimateOnScroll key={doc.id} delay={i * 60}>
                      <div className="doc-card">
                        <div className="doc-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {renderDocIcon(doc.fileType)}
                        </div>
                        <div className="doc-info" style={{ flex: 1 }}>
                          <h4>{doc.title}</h4>
                          <p>{doc.description}</p>
                          <div className="doc-meta">
                            <span>ID: {doc.documentId}</span>
                            <span>{doc.category}</span>
                            {doc.subcategory && <span>{doc.subcategory}</span>}
                            <span>{doc.date}</span>
                            {doc.academicYear && <span>Tenure: {doc.academicYear}</span>}
                          </div>
                        </div>
                        {doc.fileUrl && (
                          <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer"
                            className="btn btn-sm btn-secondary" style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <EyeIcon size={14} /> View
                          </a>
                        )}
                      </div>
                    </AnimateOnScroll>
                  ))}
                </div>
              ) : (
                <AnimateOnScroll>
                  <div className="empty-state">
                    <div className="empty-state-icon" style={{ display: 'flex', justifyContent: 'center' }}>
                      <FolderIcon size={48} color="var(--color-math-blue)" />
                    </div>
                    <h3>Documentation Library</h3>
                    <p>
                      {search || catFilter !== 'All'
                        ? 'No documents match your current search or filter.'
                        : 'Official club documents, reports, academic resources, and records will be organized and accessible here as they are prepared and approved for sharing.'}
                    </p>
                  </div>
                </AnimateOnScroll>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
