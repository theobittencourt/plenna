import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../common/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const userId = `USR${Date.now()}`;
    const clienteId = `CLI${Date.now()}`;

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        userId,
        clienteId,
        telefone: dto.telefone,
        cpfCnpj: dto.cpfCnpj,
      },
    });

    const token = this.jwt.sign({ sub: user.id, userId: user.userId });
    return { user: this.sanitizeUser(user), token };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.login }, { username: dto.login }] },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (user.banido) throw new UnauthorizedException('Usuário banido');
    if (!user.status) throw new UnauthorizedException('Conta não ativada');

    const token = this.jwt.sign({ sub: user.id, userId: user.userId });
    return { user: this.sanitizeUser(user), token };
  }

  private sanitizeUser(user: any) {
    const { password, ...result } = user;
    return result;
  }
}
