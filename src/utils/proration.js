function proration(asignations, month, year) {
    const result = [];

    // Obtener el primer y último día del mes seleccionado
    const initMonth = new Date(year, month - 1, 1);
    const endMonth = new Date(year, month, 1);

    asignations.forEach(asignation => {
        // Clonar las asignaciones para no modificar las originales
        const newAsignation = {
            id: asignation.id,
            init_date: asignation.init_date,
            finish_date: asignation.finish_date,
            PeopleId: asignation.PeopleId,
            projectId: asignation.projectId
        };

        // Clonar las fechas para evitar modificar las originales
        const newInitDate = new Date(newAsignation.init_date);
        const newFinishDate = new Date(newAsignation.finish_date);

        console.log("NEWINITI: ", newInitDate);

        // Si la fecha de inicio es anterior al mes seleccionado, ajustarla al primer día del mes
        if (newInitDate < initMonth) {
            newAsignation.init_date = initMonth.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        }

        // Si la fecha de termino es posterior al mes seleccionado, ajustarla al último día del mes
        if (newFinishDate > endMonth) {
            newAsignation.finish_date = endMonth.toISOString().split('T')[0]; // Formato YYYY-MM-DD
            console.log("end month", endMonth);
        }

        // Agregar la asignación procesada al resultado
        result.push(newAsignation);
    });

    const peopleData = {};

    result.forEach(asignation => {

        const { PeopleId, projectId, finish_date, init_date } = asignation;
        const daysWorked = (new Date(finish_date) - new Date(init_date)) / (1000 * 60 * 60 * 24);

        if (!peopleData[PeopleId]) {
            peopleData[PeopleId] = {};
        }

        if (!peopleData[PeopleId][projectId]) {
            peopleData[PeopleId][projectId] = { days: 0, prop: 0 };
        }

        peopleData[PeopleId][projectId].days += daysWorked;
    });

    const result_2 = [];

    for (const peopleId in peopleData) {
        const projectsData = peopleData[peopleId];
        const totalDays = Object.values(projectsData).reduce((total, project) => total + project.days, 0);

        const personResult = {
            PeopleId: peopleId,
            projects: {}
        };

        for (const projectId in projectsData) {
            const project = projectsData[projectId];
            const prop = project.days / totalDays;

            personResult.projects[projectId] = {
                days: project.days,
                prop: prop.toFixed(2) // Round to 2 decimal places
            };
        }

        result_2.push(personResult);
    }

    return result_2;
}





module.exports = {
    proration,
};