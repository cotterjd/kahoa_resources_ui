const otherKey = "Other Languages I Have Skill In (include your skill rating)"
export function getData () {
    return fetch(`https://kahoa-resource-server-prototype.onrender.com/resources`)
      .then(r => r.json())
}
export function getSkills (record) {
    return Object.keys(record).reduce((acc, key) => {
      if (![`TimeStamp`, `Username`, otherKey].includes(key)) return [...acc, key]
      return acc
    }, [])
}
export function getFormattedData (data) {
    return data.map(x => ({
        name: x.Username,
        available: false,
        dateAvailable: ``,
        project: ``,
        skills: {
          "Spring": x.Spring,
          "Hibernate": x.Hibernate,
          "Maven": x.Maven,
          "Flyway": x.Flyway,
          "GraphQL": x.GraphQL,
          "MySQL": x.MySQL,
          "PL/SQL": x["PL/SQL"],
          "Postgres": x.Postgres,
          "jMeter": x.jMeter,
          "Python": x.Python,
          "JavaScript": x.JavaScript,
          "C#": x["C#"],
          "PHP": x.PHP,
          "Angular": x.Angular,
          "React": x.React,
          "Vue": x.Vue.js,
          "MongoDB": x.MongoDB,
          "AWS": x.AWS,
          "Azure": x.Azure,
          "Bash": x.Bash,
          "Linux": x.Linux,
          "CSS": x.CSS,
          "TypeScript": x.TypeScript,
          "JQuery": x.JQuery,
          "Flutter": x.Flutter,
          "Swift": x.Swift,
          "Objective C": x["Objective C"],
          "Android Native": x["Android Native"],
          "Kotlin": x.Kotlin,
          "Go": x.Go,
          "Erlang": x.Erlang,
          "ReactNative": x.ReactNative,
          "DynamoDB": x.DynamoDB,
          "Node": x.Node.js,
          "Java": x.Java,
          "SQL Server": x["SQL Server"],
        },
        otherSkills: x[otherKey],
    }))
}
