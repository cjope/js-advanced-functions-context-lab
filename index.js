let createEmployeeRecord = function(info){
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(e){
    return e.map(function(info){
        return createEmployeeRecord(info)
    })
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split (' ')
    this.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: Number(hour)
    })

    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: Number(hour)
    })
    return this
}

let hoursWorkedOnDate = function(clockedDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === clockedDate
    })
    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === clockedDate
    })
    return (outEvent.hour - inEvent.hour)/100
}

let wagesEarnedOnDate = function(clockedDate){
    let wage = hoursWorkedOnDate.call(this, clockedDate) * this.payPerHour
    return wage
}

const allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}  



let findEmployeeByFirstName = function(collection, firstName){
    return collection.find(function (e){
        return e.firstName === firstName
    })
}

let calculatePayroll = function (paycheck) {
    return paycheck.reduce(function(memo, e){
        return memo + allWagesFor.call(e)
    },0)
}