import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { HashService } from 'src/shared/hash.service';
import { GenerateService } from 'src/shared/generate.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private hashService: HashService,
    private generateService: GenerateService,
  ) {}

  //Création d'un utilisateur
  async create(user: User): Promise<User> {
    //Verifie si l'utilisateur existe déjà
    const userExist = await this.findOneByEmail(user.email);

    //Si l'utilisateur existe déjà, on renvoie une erreur
    if (userExist)
      throw new HttpException('User already exist', HttpStatus.NOT_ACCEPTABLE);

    //Sinon on hash le mot de passe et on génére le matricule puis on sauvegarde l'utilisateur
    user.password = await this.hashService.hash(user.password);
    user.matricule = this.generateService.generateMatricule(5);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
