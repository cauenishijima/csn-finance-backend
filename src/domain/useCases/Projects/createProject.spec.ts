import { InMemoryProjectsRepository } from "../../tests/repositories/inMemoryProjectsRepository";
import { CreateProject } from "./createProject";

describe('Create project use case', () => {
  it('should be able to create a new project', async () => {
    const projectsRepository = new InMemoryProjectsRepository();

    const ucCreateProject = new CreateProject(projectsRepository);  

    const response = await ucCreateProject.execute({
      name: 'fake-project-name',
      ownerId: 'fake-owner-id',
    });

    expect(response).toBeTruthy();
  });  

  it('should NOT be able to create a new project with same name for SAME owner', async () => {
    await expect(async () => {
      const projectsRepository = new InMemoryProjectsRepository();

      const ucCreateProject = new CreateProject(projectsRepository);  
      
      await ucCreateProject.execute({
        name: 'fake-project-name',
        ownerId: 'fake-owner-id',
      });

      await ucCreateProject.execute({
        name: 'fake-project-name',
        ownerId: 'fake-owner-id',
      })
    }).rejects.toThrowError(new Error('Project already exists.'))
  });    

  it('should be able to create a new project with same name for DIFFERENT owner', async () => {
      const projectsRepository = new InMemoryProjectsRepository();

      const ucCreateProject = new CreateProject(projectsRepository);  
      
      await ucCreateProject.execute({
        name: 'fake-project-name',
        ownerId: 'fake-owner-id',
      });

      const response = await ucCreateProject.execute({
        name: 'fake-project-name',
        ownerId: 'another-owner-id',
      });

      expect(response).toBeTruthy();
  });      

  it('should NOT be able to create a new project without name.', async () => {
    await expect( async() => {
      const projectsRepository = new InMemoryProjectsRepository();

      const ucCreateProject = new CreateProject(projectsRepository);  
      
      await ucCreateProject.execute({
        name: '',
        ownerId: 'fake-owner-id',
      });
    }).rejects.toThrowError(new Error('Project name is required.'));
  })
});