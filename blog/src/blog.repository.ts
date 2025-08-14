import { readFile, writeFile } from "fs/promises";
import { PostDto, Post } from "./blog.model";
import { Injectable } from "@nestjs/common";

// 블로그 리포지토리 인터페이스 정의
export interface BlogRepository {
    getAllPost(): Promise<Post[]>;
    createPost(postDto: PostDto): Promise<void>;
    getPost(id: string): Promise<Post | null>;
    deletePost(id: string): Promise<void>;
    updatePost(id: string, postDto: PostDto): Promise<void>;
}

@Injectable()
export class BlogFileRepository implements BlogRepository {
    FILE_NAME = './src/blog.data.json';

    async getAllPost(): Promise<Post[]> {
        try {
            const datas = await readFile(this.FILE_NAME, 'utf8');
            const posts = JSON.parse(datas);
            return posts;
        } catch (error) {
            return [];
        }
    }

    async createPost(postDto: PostDto): Promise<void> {
        const posts = await this.getAllPost();
        const id = posts.length + 1;
        
        const createPost: Post = {
            id: id.toString(),
            title: postDto.title,
            content: postDto.content,
            name: postDto.name,
            createdDt: new Date(),
            updatedDt: postDto.updatedDt
        };
        
        posts.push(createPost);
        await writeFile(this.FILE_NAME, JSON.stringify(posts, null, 2));
    }

    // 40번째 줄 오류 수정: 반환 타입을 Post | null로 맞춤
    async getPost(id: string): Promise<Post | null> {
        const posts = await this.getAllPost();
        const result = posts.find((post) => post.id === id);
        return result ?? null; // undefined일 경우 null 반환
    }

    async deletePost(id: string): Promise<void> {
        const posts = await this.getAllPost();
        const filteredPosts = posts.filter((post) => post.id !== id);
        await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts, null, 2));
    }

    async updatePost(id: string, postDto: PostDto): Promise<void> {
        const posts = await this.getAllPost();
        const index = posts.findIndex((post) => post.id === id);
        
        if (index !== -1) {
            // 54번째 줄 오류 수정: 스프레드 연산자 사용하지 않고 직접 생성
            const updatePost: Post = {
                id: id, // id를 직접 지정
                title: postDto.title,
                content: postDto.content,
                name: postDto.name,
                createdDt: posts[index].createdDt,
                updatedDt: new Date()
            };
            
            posts[index] = updatePost;
            await writeFile(this.FILE_NAME, JSON.stringify(posts, null, 2));
        }
    }
}