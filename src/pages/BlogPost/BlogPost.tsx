import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Tag,
  User,
  Image as ImageIcon } from
'lucide-react';
import { PageMeta } from '../../components/PageMeta';
import { SkeletonLoader } from '../../components/SkeletonLoader/SkeletonLoader';
import { useApi } from '../../hooks/useApi';
import { api } from '../../api/api';
import './BlogPost.css';
export function BlogPost() {
  const { slug } = useParams<{
    slug: string;
  }>();
  const {
    data: post,
    loading,
    error
  } = useApi(() => api.getBlogPost(slug || ''));
  if (loading) {
    return (
      <section className="section section-bg">
        <div className="container">
          <div className="post-header">
            <SkeletonLoader
              height="20px"
              width="200px"
              className="mx-auto mb-4" />
            
            <SkeletonLoader
              height="60px"
              width="80%"
              className="mx-auto mb-8" />
            
          </div>
          <SkeletonLoader
            height="400px"
            width="100%"
            borderRadius="16px"
            className="mb-12" />
          
          <div className="post-content">
            <SkeletonLoader height="20px" width="100%" className="mb-4" />
            <SkeletonLoader height="20px" width="100%" className="mb-4" />
            <SkeletonLoader height="20px" width="80%" className="mb-8" />
            <SkeletonLoader height="20px" width="100%" className="mb-4" />
            <SkeletonLoader height="20px" width="90%" />
          </div>
        </div>
      </section>);

  }
  if (error || !post) {
    return (
      <section className="section section-bg text-center">
        <div className="container">
          <h2>Post not found</h2>
          <p className="mb-6">
            The article you are looking for does not exist.
          </p>
          <Link to="/blog" className="btn btn-primary">
            Back to Blog
          </Link>
        </div>
      </section>);

  }
  return (
    <>
      <PageMeta
        title={`${post.title} | Havenique Blog`}
        description={post.excerpt} />
      

      <section className="section section-bg">
        <div className="container">
          <article>
            <header className="post-header">
              <div className="post-meta">
                <span>
                  <Tag size={16} /> {post.category}
                </span>
                <span>
                  <Calendar size={16} />{' '}
                  {new Date(post.date).toLocaleDateString()}
                </span>
                <span>
                  <User size={16} /> Havenique Team
                </span>
              </div>
              <h1 className="post-title">{post.title}</h1>
            </header>

            <div className="post-featured-image">
              <ImageIcon size={80} opacity={0.5} />
            </div>

            <div
              className="post-content"
              dangerouslySetInnerHTML={{
                __html: post.content
              }} />
            

            <footer className="post-footer">
              <Link to="/blog" className="back-link">
                <ArrowLeft size={16} /> Back to all articles
              </Link>
            </footer>
          </article>
        </div>
      </section>
    </>);

}