import { Project } from "../entities/Project";

export interface IProjectsRepository {
  findByName(name: string, ownerId: string): Promise<Project | null>;
  create(project: Project): Promise<void>;
}