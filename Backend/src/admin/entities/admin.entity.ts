import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class files {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    movie_id: string;

    @Column()
    src: string;

    @Column()
    format: string;

    @Column()
    file_name: string;
    
    @Column()
    artist: string;

    @Column()
    sub_title: string;

    @Column()
    position: Number;

    @Column()
    premium: Number;

    @Column()
    server: string;
    
    @Column()
    status: Number;

    @CreateDateColumn()
    createdAt: string;

    @CreateDateColumn()
    updated_at: Number;

    @Column()
    subtitle: string;
}
