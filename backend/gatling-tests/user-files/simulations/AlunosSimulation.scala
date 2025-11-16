import io.gatling.core.scenario.Simulation
import io.gatling.core.Predef._
import io.gatling.http.Predef._

class AlunosSimulation extends Simulation {

  val httpProtocol = http
    .baseUrl("http://host.docker.internal:8080")  // seu Spring Boot
    .acceptHeader("application/json")
    .contentTypeHeader("application/json")

  val scn = scenario("Carga de ALUNOS")
    .exec(
      http("Listar alunos")
        .get("/alunos")
        .check(status.is(200))
    )
    .pause(1)
    .exec(
      http("Cadastrar aluno")
        .post("/alunos")
        .body(StringBody(
          """{
            "nome": "Aluno Teste",
            "idade": 20
          }"""
        )).asJson
        .check(status.in(200, 201))
    )

  setUp(
    scn.inject(
      rampUsers(100) during (30) // 100 usuários em 30 segundos
    )
  ).protocols(httpProtocol)

}
