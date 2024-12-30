import React from "react";
import { graphql } from "gatsby";

const BlogList = ({ data }) => {
    // 从GraphQL查询获取所有文章节点
    const posts = data.allMarkdownRemark.edges;
    return (
        <div>
            {posts.map(({ node }, index) => (
                <div key={index}>
                    <h2><a href={`/blog/${node.fields.slug}`}>{node.frontmatter.title}</a></h2>
                    <p>{node.frontmatter.date}</p>
                </div>
            ))}
        </div>
    );
};

export const query = graphql`
    query {
        allMarkdownRemark {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date
                    }
                }
            }
        }
    }
`;

export default BlogList;