import { Project } from "../../entities/Project"
import { ProjectsRepository } from "../../repositories/ProjectsRepository";

type CreateProjectRequest = {
  name: string;
  ownerId: string;
  collaboratorsId?: string[];
}

export class CreateProject {
  constructor(
    private projectsRepository: ProjectsRepository
  ) {}

  async execute({name, ownerId, collaboratorsId}: CreateProjectRequest) {

    if (!name) {
      throw new Error('Project name is required.')
    }

    const projectAlreadyExists = await this.projectsRepository.findByName(name, ownerId);

    if (projectAlreadyExists) {
      throw new Error('Project already exists.')
    }

    const project = Project.create({
      name, 
      ownerId, 
      collaboratorsId,
      createdAt: new Date()
    });

    this.projectsRepository.create(project);

    return project;
  }
}