# Projeto Spring Boot com Monitoramento

##  Descrição do Projeto

Este projeto é uma aplicação Spring Boot com sistema completo de monitoramento e observabilidade, incluindo métricas com Prometheus, visualização com Grafana, e testes de carga para garantir performance e escalabilidade. A aplicação implementa autenticação e expõe endpoints documentados via Swagger.

## Tecnologias Utilizadas

- **Java 17+** 
- **Spring Boot 3.x** 
    - Spring Web
    - Spring Security
    - Spring Boot Actuator
- **Prometheus** 
- **Grafana** 
- **Docker & Docker Compose**
- **Swagger/OpenAPI** 
- **Gatling**
- **Render** 

## Como Rodar Localmente

### Pré-requisitos

- JDK 17 ou superior instalado
- Maven ou Gradle
- Docker e Docker Compose instalados
- Git

### Passo a Passo

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd <nome-do-projeto>
```

2. **Execute a aplicação Spring Boot**
```bash
# Com Maven
./mvnw spring-boot:run

# Com Gradle
./gradlew bootRun
```

3. **Suba o ambiente de monitoramento com Docker**
```bash
docker-compose up -d
```

A aplicação estará disponível em: `http://localhost:8080`

## Como configurar o keycloak
1. Rode esse comando Docker:
```bash
docker run -p 8081:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:24.0.1 start-dev
```
 2. coloque essa url no navegador:
``
http://localhost:8081
``
e depois faça o login 
    - **login**: admin
    - **senha**: admin

3. Configure o keycloak:
   1. Crie um realm;
   2. Crie um User, depois em credentials coloque uma senha;
   4. Crie realm-roles (ex: ROLE_USER, ROLE_ADMIN)
   4. Atribua os roles ao user
   5. Crie um client para a aplicação
4. Depois de configurado, acesse esse endpoint:
```bash
http://localhost:8081/realms/meu-realm/protocol/openid-connect/token
```
### No body usando x-www-form-urlencoded:
- **client_id**: {client_id configurado no keycloak}
- **client_secret**: {client-secret gerado pelo keycloak após a criação do client}
- **grant_type**: {password}
- **username**: {username configurado em users no keycloak}
- **password**: {password configurado em users/credentials no keycloak}
5. pegue o access_token na resposta para conseguir acessar os endpoint protegidos através do Bearer token

## Como Acessar Swagger e Autenticação
### Acessando o Swagger UI

1. Inicie a aplicação
2. Acesse: `http://localhost:8080/swagger-ui.html`
3. A documentação interativa da API estará disponível

### Endpoints Disponíveis

- **Swagger UI:** `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON:** `http://localhost:8080/v3/api-docs`
- **Health Check:** `http://localhost:8080/actuator/health`

##  Como Configurar Prometheus e Grafana

### Prometheus

1. **Verifique o arquivo de configuração** (`prometheus.yml`)
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'spring-boot-app'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['host.docker.internal:8080']
```

2. **Acesse o Prometheus**
    - URL: `http://localhost:9090`
    - Verifique se o target está UP em: Status > Targets

3. **Teste uma query**
    - Exemplo: `http_server_requests_seconds_count`

### Grafana

1. **Acesse o Grafana**
    - URL: `http://localhost:3000`
    - Login padrão:
        - Username: `admin`
        - Password: `admin`

2. **Adicione o Prometheus como Data Source**
    - Vá em: Configuration (⚙️) > Data Sources > Add data source
    - Selecione **Prometheus**
    - URL: `http://prometheus:9090`
    - Clique em **Save & Test**

3. **Importe um Dashboard**
    - Vá em: Create (+) > Import
    - Use o ID: **4701** (JVM Micrometer)
    - Ou ID: **11378** (Spring Boot Statistics)
    - Selecione o data source Prometheus
    - Clique em **Import**

4. **Dashboards Recomendados**
    - **JVM (Micrometer):** ID 4701
    - **Spring Boot 2.1 Statistics:** ID 11378
    - **Spring Boot APM Dashboard:** ID 12900

##  Como Executar Testes de Carga e Stress

### Opção 1: Gatling

1. **Instale o Gatling**
```bash
# Via SDKMAN
sdk install gatling

# Via Download direto
# Baixe de: https://gatling.io/open-source/
```

2. **Crie um script de teste** (`LoadTest.scala`)
```scala
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
  // REQUISIÇÃO PARA PEGAR TOKEN
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
  //  TESTAR ENDPOINTS PROTEGIDOS
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

```

3. **Execute o teste**
```bash
gatling.sh -s LoadTest
```


### Monitorando Durante os Testes

Durante a execução dos testes, monitore:
- **Grafana:** Visualize métricas em tempo real
- **Prometheus:** Queries para análise específica
- **Logs da aplicação:** Erros e warnings
