import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { PageMeta } from '../../components/PageMeta';
import { SkeletonLoader } from '../../components/SkeletonLoader/SkeletonLoader';
import { useApi } from '../../hooks/useApi';
import { api } from '../../api/api';
import './Blog.css';
export function Blog() {
  const { data: posts, loading } = useApi(() =>
  api.getBlogPosts({
    published: 'true'
  })
  );
  // Extract unique categories for sidebar
  const categories = posts ?
  Array.from(new Set(posts.map((p) => p.category))) :
  [];
  return (
    <>
      <PageMeta
        title="Blog & Resources | Havenique Home Based Nursing Care"
        description="Health tips, news, and resources from the Havenique nursing team." />
      

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>Health Resources</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> &gt; Blog
          </div>
        </div>
      </section>

      <section className="section section-bg">
        <div className="container">
          <div className="blog-layout">
            {/* Main Content */}
            <div>
              {loading ?
              <div className="blog-grid">
                  {Array(4).
                fill(0).
                map((_, i) =>
                <div key={i} className="blog-card">
                        <SkeletonLoader
                    height="200px"
                    width="100%"
                    borderRadius="0" />
                  
                        <div className="blog-content">
                          <SkeletonLoader
                      height="20px"
                      width="100%"
                      className="mb-4" />
                    
                          <SkeletonLoader
                      height="60px"
                      width="100%"
                      className="mb-4" />
                    
                          <SkeletonLoader
                      height="20px"
                      width="40%"
                      className="mt-auto" />
                    
                        </div>
                      </div>
                )}
                </div> :
              posts && posts.length > 0 ?
              <div className="blog-grid">
                  {posts.map((post: any) =>
                <div key={post.id} className="blog-card">
                      <div className="blog-image">
                        <ImageIcon size={48} opacity={0.5} />
                      </div>
                      <div className="blog-content">
                        <div className="blog-meta">
                          <span className="blog-category">{post.category}</span>
                          <span>
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <Link to={`/blog/${post.slug}`} className="read-more">
                          Read More <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                )}
                </div> :

              <div className="empty-blog">
                  <h3>Resources coming soon</h3>
                  <p>
                    We are currently preparing helpful health articles and
                    resources for you.
                  </p>
                </div>
              }
            </div>

            {/* Sidebar */}
            <aside className="blog-sidebar">
              <div className="sidebar-widget">
                <h4>Categories</h4>
                {loading ?
                <SkeletonLoader height="100px" width="100%" /> :
                categories.length > 0 ?
                <ul className="category-list">
                    {categories.map((cat: any, i) =>
                  <li key={i}>
                        <a href="#">{cat}</a>
                      </li>
                  )}
                  </ul> :

                <p className="text-sm text-gray-500">
                    No categories available.
                  </p>
                }
              </div>

              <div className="sidebar-widget">
                <h4>Recent Posts</h4>
                {loading ?
                <SkeletonLoader height="200px" width="100%" /> :
                posts && posts.length > 0 ?
                <ul className="recent-posts-list">
                    {posts.slice(0, 3).map((post: any) =>
                  <li key={post.id}>
                        <div className="recent-post-thumb">
                          <ImageIcon size={20} />
                        </div>
                        <div className="recent-post-info">
                          <h5>
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                          </h5>
                          <span className="recent-post-date">
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                      </li>
                  )}
                  </ul> :

                <p className="text-sm text-gray-500">No recent posts.</p>
                }
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>);

}