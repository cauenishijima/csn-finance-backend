import { Project } from "../../entities/Project";
import { IProjectsRepository } from "../IProjectsRepository";

export class InMemoryProjectsRepository implements IProjectsRepository { 
  public projects: Project[] = [];

  
  async findByName(name: string, ownerId: string): Promise<Project | null> {

    const project = this.projects.find(project => project.props.name === name && project.props.ownerId === ownerId);
    
    return project || null;
  }

  async create(project: Project): Promise<void> {
    this.projects.push(project);
  }
}