class MedicalHistoryService<T> {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  async getById(id: string) {
    return await this.model.findMany({
      where: { id },
    });
  }

  async create(data: T) {
    return await this.model.create({
      data,
    });
  }

  async update(id: string, data: T) {
    return await this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await this.model.delete({
      where: { id },
    });
  }
}

export default MedicalHistoryService;
