import conf from "../conf/conf.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug /* ID.unique() */,
        { title, content, featuredImage, status, userId }
      ); /* here i used slug in place of documentID -, can also use ID.unique() */
    } catch (err) {
      console.error(
        "Appwrite service :: POST CREATION FAILED :: createPost()",
        err
      );
      throw err;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (err) {
      console.error(
        "Appwrite service :: UPDATE POST ERROR :: updatePost()",
        err
      );
      throw err;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (err) {
      console.error(
        "Appwrite service :: Delete Post Error :: deletePost()",
        err
      );
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (err) {
      console.error("Appwrite service :: getPost()", err);
      return false;
    }
  }

  async getPosts(
    queries = [
      Query.equal(
        "status",
        "active"
      ) /* we created indexes for this only in appwrite */,
    ]
  ) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (err) {
      console.error("Appwrite service :: getPosts()", err);
      return false;
    }
  }

  // file upload service TODO : shift to a separate file
  async uploadFile(file) {
    try {
      await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
      return true;
    } catch (err) {
      console.error("Appwrite service :: uploadFile() ERROR ::", err);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (err) {
      console.error("Appwrite service :: deleteFile() ERROR ::", err);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
