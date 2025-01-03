/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions
//   createPage({
//     path: "/using-dsg",
//     component: require.resolve("./src/templates/using-dsg.js"),
//     context: {},
//     defer: true,
//   })
// }

const path = require("path");

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;
    if (node.internal.type === "MarkdownRemark") {
        // 假设文章的文件名（去掉扩展名）作为slug，可根据实际情况调整逻辑
        const slug = node.fileAbsolutePath.split('/').pop().split('.').shift();
        createNodeField({
            name: "slug",
            node,
            value: slug
        });
    }
};

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    // 先查询文章列表数据
    const listResult = await graphql(`
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
    `);
    // 创建文章列表页面
    createPage({
        path: "/",
        component: path.resolve("./src/templates/blog-list.js"),
        context: {
            posts: listResult.data.allMarkdownRemark.edges
        }
    });


    listResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const slug = node.fields.slug;
        createPage({
            // 这里要根据实际的路径规则来构建，比如以 /blog/ 开头加上slug作为完整路径
            path: `/blog/${slug}`,
            component: path.resolve("./src/templates/blog-post.js"),
            context: {
                slug: slug
            }
        });
    });

  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })

  createPage({
    path: "/1ndex",
    component: require.resolve("./src/pages/1ndex.js"),
    context: {},
    defer: true,
  })

};