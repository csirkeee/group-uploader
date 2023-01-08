import { AppDataSource } from "../data/datasource";
import { GroupEntity } from "../data/entities/group";
import { Group, Image } from "../dtos/group";
import { ImageEntity } from "../data/entities/image";

export async function createNewGroup(group: GroupEntity) {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const groupRepository = AppDataSource.getRepository(GroupEntity);

  await groupRepository.save(group);
}

const mapImageEntityToDto = (entity: ImageEntity): Image => {
  return {
    id: entity.id,
    filename: entity.filename,
    url: entity.url,
  };
};

const mapGroupEntityToDto = (entity: GroupEntity): Group => {
  return {
    id: entity.id,
    name: entity.name,
    description: entity.description,
    images: entity.images.map(mapImageEntityToDto),
  };
};

export async function getAllGroups() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const groupRepository = AppDataSource.getRepository(GroupEntity);

  const groupEntities = await groupRepository.find({relations: ['images']});

  return groupEntities.map(mapGroupEntityToDto);
}