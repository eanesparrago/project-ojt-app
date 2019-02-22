const roles = Object.freeze({
  ADMINISTRATOR: "administrator",
  SUPERVISOR: "supervisor",
  TRAINEE: "trainee",
  EMPLOYEE: "employee",
  UNAUTHORIZED: "unauthorized",
  properties: {
    administrator: {
      label: "Administrator",
      defaultRoute: "/admin"
    },
    supervisor: {
      label: "Supervisor",
      defaultRoute: "/app"
    },
    trainee: {
      label: "Trainee",
      defaultRoute: "/app"
    },
    employee: {
      label: "Employee",
      defaultRoute: "/app"
    },
    unauthorized: {
      label: "Unauthorized",
      defaultRoute: "/app"
    }
  }
});

export default { roles };
