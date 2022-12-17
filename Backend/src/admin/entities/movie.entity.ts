import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cat_id: string;

    @Column()
    title: string;

    @Column()
    cover: string;

    @Column()
    landscape: string;
    
    @Column()
    trailer: string;

    @Column()
    tags: string;

    @Column()
    released: Number;

    @Column()
    quality: Number;

    @Column()
    imbd: string;
    
    @Column()
    description: Number;

    @CreateDateColumn()
    position: Number;

    @CreateDateColumn()
    trending_value: Number;

    @Column()
    server: string;

    @Column()
    mdb_posted: Number;
    
    @Column()
    status: Number;

    @CreateDateColumn()
    created_at: string;

    @CreateDateColumn()
    updated_at: Number;
}
