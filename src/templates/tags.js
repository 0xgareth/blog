import React from "react"

import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Bio from "../components/bio"

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const siteTitle = data.site.siteMetadata.title
  const tagHeader = `${tag}`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={tagHeader} />
      <Bio location={location}/>

      {/* links */}
      <div 
        style={{ 
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-evenly`,
          listStyle: `none`,
          padding: 0,
        }}>
        <Link style={{ boxShadow: `none` }} to={'/posts-by-date'}>
         • all posts by date • 
        </Link>
        <Link style={{ boxShadow: `none` }} to={'/posts'}>
         • all posts by category • 
        </Link>
      </div>

      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`