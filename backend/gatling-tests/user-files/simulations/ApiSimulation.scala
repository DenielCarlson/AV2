package simulations

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

class ApiSimulation extends Simulation {

  // ============================
  // CONFIGURAÇÃO DO GATLING
  // ============================

  // URLs
  val keycloakUrl = "http://localhost:8081/realms/meu-realm/protocol/openid-connect/token"
  val apiUrl = "http://host.docker.internal:8080"

  // Credenciais Keycloak
  val clientId = "minha-api"
  val clientSecret = "N1NUZWbgUDISumw0wHKI0UsXqlG95O13"
  val username = "dniu"
  val password = "admin"

  val httpProtocol = http
    .baseUrl(apiUrl)
    .acceptHeader("application/json")
    .contentTypeHeader("application/json")

  // ============================
  // 1️⃣ REQUISIÇÃO PARA PEGAR TOKEN
  // ============================

  val auth =
    exec(
      http("Keycloak - Obter Token")
        .post(keycloakUrl)
        .formParam("grant_type", "password")
        .formParam("client_id", clientId)
        .formParam("client_secret", clientSecret)
        .formParam("username", username)
        .formParam("password", password)
        .check(status.is(200))
        .check(jsonPath("$.access_token").saveAs("token"))
    )

  // ============================
  // 2️⃣ TESTAR ENDPOINTS PROTEGIDOS
  // ============================

  val testApi =
    exec(session => {
      println("TOKEN: " + session("token").as[String])
      session
    })
      // ---- GET ALUNOS ----
      .exec(
        http("GET /alunos")
          .get("/alunos")
          .header("Authorization", "Bearer ${token}")
          .check(status.in(200, 204))
      )
      .pause(1)

      // ---- POST ALUNOS ----
      .exec(
        http("POST /alunos")
          .post("/alunos")
          .header("Authorization", "Bearer ${token}")
          .body(StringBody("""{"nome": "Aluno Teste", "email": "teste@gatling.com"}"""))
          .check(status.in(200, 201, 202))
      )
      .pause(1)

      // ---- GET CURSOS ----
      .exec(
        http("GET /cursos")
          .get("/cursos")
          .header("Authorization", "Bearer ${token}")
          .check(status.in(200, 204))
      )
      .pause(1)

      // ---- POST CURSOS ----
      .exec(
        http("POST /cursos")
          .post("/cursos")
          .header("Authorization", "Bearer ${token}")
          .body(StringBody("""{"nome": "Curso Teste", "descricao": "Descrição Gatling"}"""))
          .check(status.in(200, 201, 202))
      )

  // ============================
  // CENÁRIO FINAL
  // ============================

  val scn = scenario("Carga API + Keycloak")
    .exec(auth)
    .exec(testApi)

  setUp(
    scn.inject(
      rampUsers(50).during(20.seconds)
    )
  ).protocols(httpProtocol)

}
