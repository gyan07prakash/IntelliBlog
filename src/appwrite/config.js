import conf from '../conf.js';
import { Client, Account, ID, Databases, Storage,Query } from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appwriteProjectId);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, 
        status, userId}){
            try{
                return await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteTableId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                        userId,
                    }
                )

            }catch(error){
                console.log("Appwrite serive :: getCurrentUser :: error", error)
            }
        }

        async updatePost(slug, {title, content, featuredImage,
            status, userId}){
                try{
                    return await this.databases.updateDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteTableId,
                        slug,
                        {
                            title,
                            content,
                            featuredImage,
                            status,
                        }
                    )
                }catch (error){
                    console.log("Appwrite serive :: getCurrentUser :: error", error)
                }
        }

        async deletePost(slug) {
            try{
                await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteTableId,
                    slug,
                )
                return true
            }
            catch(error){
                console.log("Appwrite serive :: getCurrentUser :: error", error);
                return false
            }

        }

        async getPost(slug){
            try{
                return await this.databases.getDocument(
                     conf.appwriteDatabaseId,
                     conf.appwriteTableId,
                     slug,
                )
            }catch{
                console.log("Appwrite serive :: getCurrentUser :: error", error);
                return false;
            }
        }

        async getPosts(queries = [Query.equal("status",
            "active")]){
                try{
                    return await this.databases.listDocuments(
                        conf.appwriteDatabaseId,
                        conf.appwriteTableId,
                        queries,

                    )

                }catch(error){
                    console.log("Appwrite serive :: getCurrentUser :: error", error)
                }
        }

        //fle upload service
        async uploadFile(file){
            try{
                return await this.bucket.createFile(
                    conf.appwriteBucketId,
                    ID.unique(),
                    file

                )
            }catch (error){
                    console.log("Appwrite serive :: getCurrentUser :: error", error)
                }
        }

        async deleteFile(fileId){
            try{
                await this.bucket.deleteFile(
                    conf.appwriteBucketId,
                    ID.unique(),
                    file

                )

            }catch (error){
                    console.log("Appwrite serive :: getCurrentUser :: error", error)
            }
        }

        getFilePreview(fileId){
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                    ID.unique(),
                    fileId
            )
        }
}

export default service