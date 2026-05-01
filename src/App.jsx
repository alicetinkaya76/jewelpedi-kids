import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/layout/Layout.jsx';
import LoadingFallback from './components/common/LoadingFallback.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';

/* Eagerly loaded: Lobby (initial route, needed for fast LCP). */
import Lobby from './pages/Lobby.jsx';

/* Lazy-loaded routes — each becomes its own chunk at build time,
 * cutting the initial JS payload from ~1 MB down to ~200-300 KB.
 */
const HallsIndex       = lazy(() => import('./pages/HallsIndex.jsx'));
const HallPage         = lazy(() => import('./pages/HallPage.jsx'));
const ExhibitDetail    = lazy(() => import('./pages/ExhibitDetail.jsx'));
const LabPage          = lazy(() => import('./pages/LabPage.jsx'));
const QuizHub          = lazy(() => import('./pages/QuizHub.jsx'));
const WorkshopHub      = lazy(() => import('./pages/WorkshopHub.jsx'));
const WorldMapPage     = lazy(() => import('./pages/WorldMapPage.jsx'));
const GlossaryPage     = lazy(() => import('./pages/GlossaryPage.jsx'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage.jsx'));
const StoriesIndex     = lazy(() => import('./pages/StoriesIndex.jsx'));
const StoryPage        = lazy(() => import('./pages/StoryPage.jsx'));
const Timeline         = lazy(() => import('./pages/Timeline.jsx'));
const Educators        = lazy(() => import('./pages/Educators.jsx'));
const GamesHub         = lazy(() => import('./pages/GamesHub.jsx'));
const GamePlay         = lazy(() => import('./pages/GamePlay.jsx'));
const PrivacyPage      = lazy(() => import('./pages/PrivacyPage.jsx'));

/** Suspense wrapper sugar — every lazy route gets the same fallback. */
function L({ children }) {
  return <Suspense fallback={<LoadingFallback />}>{children}</Suspense>;
}

/**
 * Ana router. Layout tüm sayfaları sarar (Header + Footer ortak).
 * ErrorBoundary runtime hata durumunda friendly UI gösterir.
 * Suspense lazy-loaded page'lerin fetch süresinde skeleton gösterir.
 */
export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          {/* Eager — initial route for fastest LCP */}
          <Route index element={<Lobby />} />

          {/* Lazy — one Suspense boundary per route so a slow chunk
              doesn't block sibling navigation */}
          <Route path="halls"                       element={<L><HallsIndex /></L>} />
          <Route path="halls/:hallId"               element={<L><HallPage /></L>} />
          <Route path="halls/:hallId/:exhibitId"    element={<L><ExhibitDetail /></L>} />
          <Route path="lab"                         element={<L><LabPage /></L>} />
          <Route path="quiz"                        element={<L><QuizHub /></L>} />
          <Route path="workshop"                    element={<L><WorkshopHub /></L>} />
          <Route path="map"                         element={<L><WorldMapPage /></L>} />
          <Route path="glossary"                    element={<L><GlossaryPage /></L>} />
          <Route path="achievements"                element={<L><AchievementsPage /></L>} />
          <Route path="stories"                     element={<L><StoriesIndex /></L>} />
          <Route path="stories/:storyId"            element={<L><StoryPage /></L>} />
          <Route path="timeline"                    element={<L><Timeline /></L>} />
          <Route path="educators"                   element={<L><Educators /></L>} />
          <Route path="games"                       element={<L><GamesHub /></L>} />
          <Route path="games/:gameId"               element={<L><GamePlay /></L>} />
          <Route path="privacy"                     element={<L><PrivacyPage /></L>} />
          <Route path="*"                           element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
