import io.gatling.core.scenario.Simulation
import io.gatling.core.Predef._
import io.gatling.http.Predef._

class CursosSimulation extends Simulation {

  val httpProtocol = http
    .baseUrl("http://host.docker.internal:8080")
    .acceptHeader("application/json")
    .contentTypeHeader("application/json")

  val scn = scenario("Carga de CURSOS")
    .exec(
      http("Listar cursos")
        .get("/cursos")
        .check(status.is(200))
    )
    .pause(1)
    .exec(
      http("Criar curso")
        .post("/cursos")
        .body(StringBody(
          """{
            "nome": "Curso Performance",
            "cargaHoraria": 40
          }"""
        )).asJson
        .check(status.in(200, 201))
    )

  setUp(
    scn.inject(
      rampUsers(200) during (20)
    )
  ).protocols(httpProtocol)
}
