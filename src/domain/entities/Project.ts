import { Entity } from "../core/Entity";

type ProjectProps = {
  name: string;
  ownerId: string;
  collaboratorsId?: string[];
  createdAt: Date;
}
export class Project extends Entity<ProjectProps>{

  private constructor(props: ProjectProps, id?: string) {
    super(props, id);
  }

  static create(props: ProjectProps, id?: string) {
    const project = new Project(props, id);

    return project;
  }

}