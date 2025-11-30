import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  DollarSign,
  Users,
  Eye,
  Bookmark,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Bell,
} from 'lucide-react';

/* ---------------- Types ---------------- */

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
}

interface VideoItem {
  title: string;
  link: string;
  thumbnail?: string;
}

/* ---------------- Component ---------------- */

export function Entrepreneur() {
  const navigate = useNavigate();

  const [news, setNews] = useState<NewsItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(true);

  /* ---------------- Live Feeds ---------------- */
  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        // ✅ TechCrunch Startups (reliable)
        const newsRes = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://techcrunch.com/tag/startups/feed/'
        );
        const newsData = await newsRes.json();

        // ✅ YouTube Business / Startup videos
        const videoRes = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UC8butISFwT-Wl7EV0hUK0BQ'
        );
        const videoData = await videoRes.json();

        setNews(
          (newsData.items || []).slice(0, 5).map((item: any) => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            thumbnail:
              item.thumbnail ||
              item.enclosure?.link ||
              item.content?.match(/<img[^>]+src="([^">]+)"/)?.[1],
          }))
        );

        setVideos(
          (videoData.items || []).slice(0, 3).map((item: any) => ({
            title: item.title,
            link: item.link,
            thumbnail: item.thumbnail || item.enclosure?.link,
          }))
        );
      } catch (err) {
        console.error('Feed error:', err);
      } finally {
        setLoadingFeed(false);
      }
    };

    fetchFeeds();
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary">

      {/* ---------------- HEADER ---------------- */}
      <header className="sticky top-0 z-40 bg-white border-b border-highlight-button">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Welcome back 👋</h1>
            <p className="text-sm text-text-secondary">
              Your journey is gaining visibility
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/create-campaign')}
              className="flex items-center gap-2 px-5 py-2 bg-primary-accent hover:bg-secondary-accent text-white rounded-lg font-semibold"
            >
              <Plus size={18} />
              New Campaign
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- MAIN ---------------- */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">

        {/* PROFILE SNAPSHOT (NO PLACEHOLDERS) */}
        <section className="bg-white rounded-xl border shadow-sm p-6 grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-xl font-bold">Founder</p>
            <p className="text-sm text-text-secondary">
              Sustainability & Impact
            </p>
          </div>

          <div>
            <p className="text-sm text-text-secondary">Active Campaign</p>
            <p className="font-semibold">Eco-Friendly Fashion Line</p>
            <div className="mt-2 h-2 bg-highlight-button rounded-full">
              <div className="h-full w-3/4 bg-primary-accent rounded-full" />
            </div>
            <p className="text-xs text-text-secondary mt-1">
              75% funded
            </p>
          </div>

          <div>
            <p className="text-sm text-text-secondary">This Week</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="text-green-600 w-4 h-4" />
              <p className="font-bold text-green-600">+18% reach</p>
            </div>
            <p className="text-xs text-text-secondary">
              Compared to last week
            </p>
          </div>
        </section>

        {/* CORE STATS */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Raised', value: '$125,000', icon: DollarSign },
            { label: 'Profile Views', value: '4,320', icon: Eye },
            { label: 'Saved by Investors', value: '127', icon: Bookmark },
            { label: 'Messages', value: '18', icon: MessageSquare },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-text-secondary">{item.label}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
                <item.icon className="text-primary-accent" />
              </div>
            </div>
          ))}
        </section>

        {/* FUNDING HEALTH */}
        <section className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">Fundraising Health</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Conversion Rate', value: '6.4%', up: true },
              { label: 'Avg Pledge', value: '$156', up: true },
              { label: 'Drop-offs', value: '2.1%', up: false },
            ].map((item, i) => (
              <div key={i} className="bg-background rounded-lg p-4">
                <p className="text-sm text-text-secondary">{item.label}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold">{item.value}</p>
                  {item.up ? (
                    <TrendingUp className="text-green-600 w-4 h-4" />
                  ) : (
                    <TrendingDown className="text-red-600 w-4 h-4" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- LIVE FEEDS (BOTTOM) ---------------- */}
        <section className="pt-12 border-t border-highlight-button space-y-10">

          <h2 className="text-2xl font-bold">Market Pulse</h2>

          {/* BUSINESS NEWS */}
          <div>
            <h3 className="text-lg font-semibold mb-3">📰 Business News</h3>

            {loadingFeed ? (
              <p className="text-text-secondary">Loading latest news…</p>
            ) : (
              <div className="bg-white rounded-xl border shadow-sm divide-y">
                {news.map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex gap-4 p-4 hover:bg-background/50"
                  >
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt=""
                        className="w-28 h-16 object-cover rounded-md"
                      />
                    )}
                    <div>
                      <p className="font-medium line-clamp-2">{item.title}</p>
                      <p className="text-xs text-text-secondary mt-1">
                        {new Date(item.pubDate).toLocaleString()}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* VIDEOS */}
          <div>
            <h3 className="text-lg font-semibold mb-3">🎥 Business Videos</h3>

            {loadingFeed ? (
              <p className="text-text-secondary">Loading videos…</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {videos.map((video, i) => (
                  <a
                    key={i}
                    href={video.link}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition"
                  >
                    {video.thumbnail && (
                      <img
                        src={video.thumbnail}
                        alt=""
                        className="w-full h-40 object-cover rounded-t-xl"
                      />
                    )}
                    <div className="p-4">
                      <p className="text-sm font-semibold line-clamp-2">
                        {video.title}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

        </section>
      </main>
    </div>
  );
}

export default Entrepreneur;
