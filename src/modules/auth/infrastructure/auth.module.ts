import { appContainer } from "@/shared/di/app.container";
import { SignInUseCase } from "../application/sign-in.usecase";
import { AuthRepository } from "../domain/auth-repository";
import { AuthV1Repository } from "./repositories/auth-v1.repository";
import { ApiClient } from "@/shared/services/api-client.service";

export class AuthModule {
  static register() {
    if (appContainer.isBound("SignInUseCase")) {
      console.log("⚠️ SignInUseCase ya está registrado.");
      return;
    }

    const apiClient = appContainer.get<ApiClient>("ApiClient");

    console.log("📌 Registrando dependencias de autenticación...");
    const authRepository = new AuthV1Repository(apiClient);
    const signInUseCase = new SignInUseCase(authRepository);

    appContainer
      .bind<AuthRepository>("AuthRepository")
      .toConstantValue(authRepository);
    appContainer
      .bind<SignInUseCase>("SignInUseCase")
      .toConstantValue(signInUseCase);
    console.log("✅ Dependencias de autenticación registradas correctamente.");
  }
}
