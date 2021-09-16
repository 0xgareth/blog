import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Tags = ({ pageContext, data, location }) => {
  const { genre } = pageContext
  const { edges } = data.allMarkdownRemark
  const siteTitle = data.site.siteMetadata.title
  const genreHeader = `${genre}`
  const formattedHeader = genreHeader.slice(0,1).toUpperCase() + genreHeader.slice(1, genreHeader.length)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={formattedHeader} />
      <h3>{formattedHeader}</h3>

      {/* links */}
      <div 
        style={{ 
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: '0',
        }}>
        <p style={{marginBottom:'2em'}}>← 
          <Link style={{ boxShadow: `none` }} to={'/books'}>
          Books
          </Link>
        </p>
      </div>

      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <ol key={slug}>
              <Link to={slug}>{title}</Link>
              <br/>
              <small>{node.frontmatter.date} • {node.frontmatter.minread} min read <span role="img" aria-label="coffee">☕</span> </small>
            </ol>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($genre: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { genre: { in: [$genre] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            minread
          }
        }
      }
    }
  }
`