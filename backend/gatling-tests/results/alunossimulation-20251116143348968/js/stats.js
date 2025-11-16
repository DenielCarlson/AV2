var stats = {
    type: "GROUP",
name: "Global Information",
path: "",
pathFormatted: "group_missing-name-b06d1",
stats: {
    "name": "Global Information",
    "numberOfRequests": {
        "total": "200",
        "ok": "0",
        "ko": "200"
    },
    "minResponseTime": {
        "total": "3",
        "ok": "-",
        "ko": "3"
    },
    "maxResponseTime": {
        "total": "148",
        "ok": "-",
        "ko": "148"
    },
    "meanResponseTime": {
        "total": "14",
        "ok": "-",
        "ko": "14"
    },
    "standardDeviation": {
        "total": "14",
        "ok": "-",
        "ko": "14"
    },
    "percentiles1": {
        "total": "11",
        "ok": "-",
        "ko": "11"
    },
    "percentiles2": {
        "total": "18",
        "ok": "-",
        "ko": "18"
    },
    "percentiles3": {
        "total": "31",
        "ok": "-",
        "ko": "31"
    },
    "percentiles4": {
        "total": "50",
        "ok": "-",
        "ko": "50"
    },
    "group1": {
    "name": "t < 800 ms",
    "count": 0,
    "percentage": 0
},
    "group2": {
    "name": "800 ms < t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t > 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group4": {
    "name": "failed",
    "count": 200,
    "percentage": 100
},
    "meanNumberOfRequestsPerSecond": {
        "total": "6.452",
        "ok": "-",
        "ko": "6.452"
    }
},
contents: {
"req_listar-alunos-45e78": {
        type: "REQUEST",
        name: "Listar alunos",
path: "Listar alunos",
pathFormatted: "req_listar-alunos-45e78",
stats: {
    "name": "Listar alunos",
    "numberOfRequests": {
        "total": "100",
        "ok": "0",
        "ko": "100"
    },
    "minResponseTime": {
        "total": "6",
        "ok": "-",
        "ko": "6"
    },
    "maxResponseTime": {
        "total": "100",
        "ok": "-",
        "ko": "100"
    },
    "meanResponseTime": {
        "total": "17",
        "ok": "-",
        "ko": "17"
    },
    "standardDeviation": {
        "total": "12",
        "ok": "-",
        "ko": "12"
    },
    "percentiles1": {
        "total": "13",
        "ok": "-",
        "ko": "13"
    },
    "percentiles2": {
        "total": "21",
        "ok": "-",
        "ko": "21"
    },
    "percentiles3": {
        "total": "35",
        "ok": "-",
        "ko": "35"
    },
    "percentiles4": {
        "total": "51",
        "ok": "-",
        "ko": "51"
    },
    "group1": {
    "name": "t < 800 ms",
    "count": 0,
    "percentage": 0
},
    "group2": {
    "name": "800 ms < t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t > 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group4": {
    "name": "failed",
    "count": 100,
    "percentage": 100
},
    "meanNumberOfRequestsPerSecond": {
        "total": "3.226",
        "ok": "-",
        "ko": "3.226"
    }
}
    },"req_cadastrar-aluno-9d354": {
        type: "REQUEST",
        name: "Cadastrar aluno",
path: "Cadastrar aluno",
pathFormatted: "req_cadastrar-aluno-9d354",
stats: {
    "name": "Cadastrar aluno",
    "numberOfRequests": {
        "total": "100",
        "ok": "0",
        "ko": "100"
    },
    "minResponseTime": {
        "total": "3",
        "ok": "-",
        "ko": "3"
    },
    "maxResponseTime": {
        "total": "148",
        "ok": "-",
        "ko": "148"
    },
    "meanResponseTime": {
        "total": "11",
        "ok": "-",
        "ko": "11"
    },
    "standardDeviation": {
        "total": "15",
        "ok": "-",
        "ko": "15"
    },
    "percentiles1": {
        "total": "8",
        "ok": "-",
        "ko": "8"
    },
    "percentiles2": {
        "total": "13",
        "ok": "-",
        "ko": "13"
    },
    "percentiles3": {
        "total": "23",
        "ok": "-",
        "ko": "23"
    },
    "percentiles4": {
        "total": "26",
        "ok": "-",
        "ko": "26"
    },
    "group1": {
    "name": "t < 800 ms",
    "count": 0,
    "percentage": 0
},
    "group2": {
    "name": "800 ms < t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t > 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group4": {
    "name": "failed",
    "count": 100,
    "percentage": 100
},
    "meanNumberOfRequestsPerSecond": {
        "total": "3.226",
        "ok": "-",
        "ko": "3.226"
    }
}
    }
}

}

function fillStats(stat){
    $("#numberOfRequests").append(stat.numberOfRequests.total);
    $("#numberOfRequestsOK").append(stat.numberOfRequests.ok);
    $("#numberOfRequestsKO").append(stat.numberOfRequests.ko);

    $("#minResponseTime").append(stat.minResponseTime.total);
    $("#minResponseTimeOK").append(stat.minResponseTime.ok);
    $("#minResponseTimeKO").append(stat.minResponseTime.ko);

    $("#maxResponseTime").append(stat.maxResponseTime.total);
    $("#maxResponseTimeOK").append(stat.maxResponseTime.ok);
    $("#maxResponseTimeKO").append(stat.maxResponseTime.ko);

    $("#meanResponseTime").append(stat.meanResponseTime.total);
    $("#meanResponseTimeOK").append(stat.meanResponseTime.ok);
    $("#meanResponseTimeKO").append(stat.meanResponseTime.ko);

    $("#standardDeviation").append(stat.standardDeviation.total);
    $("#standardDeviationOK").append(stat.standardDeviation.ok);
    $("#standardDeviationKO").append(stat.standardDeviation.ko);

    $("#percentiles1").append(stat.percentiles1.total);
    $("#percentiles1OK").append(stat.percentiles1.ok);
    $("#percentiles1KO").append(stat.percentiles1.ko);

    $("#percentiles2").append(stat.percentiles2.total);
    $("#percentiles2OK").append(stat.percentiles2.ok);
    $("#percentiles2KO").append(stat.percentiles2.ko);

    $("#percentiles3").append(stat.percentiles3.total);
    $("#percentiles3OK").append(stat.percentiles3.ok);
    $("#percentiles3KO").append(stat.percentiles3.ko);

    $("#percentiles4").append(stat.percentiles4.total);
    $("#percentiles4OK").append(stat.percentiles4.ok);
    $("#percentiles4KO").append(stat.percentiles4.ko);

    $("#meanNumberOfRequestsPerSecond").append(stat.meanNumberOfRequestsPerSecond.total);
    $("#meanNumberOfRequestsPerSecondOK").append(stat.meanNumberOfRequestsPerSecond.ok);
    $("#meanNumberOfRequestsPerSecondKO").append(stat.meanNumberOfRequestsPerSecond.ko);
}
