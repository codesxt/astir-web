angular.module('AstirWebApp')
.controller('calendarModalCtrl', calendarModalCtrl);

function calendarModalCtrl ($uibModalInstance, dateData, moment){
  vm = this;
  vm.date = dateData.date.start;
  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  vm.addDay = function(){
    vm.date = moment(vm.date).add(1, 'days');
  }
  vm.close = function(result){
    vm.date.hour(vm.time.hour);
    vm.date.minute(vm.time.minutes);
    vm.date.second(vm.time.seconds);
    var endDate = moment(vm.date)
    .add(vm.duration.days, 'days')
    .add(vm.duration.hours, 'hours')
    .add(vm.duration.minutes, 'minutes');
    $uibModalInstance.close({
      start: moment(vm.date),
      finish: endDate
    });
  };

  vm.time = {
    hour: 0,
    minutes: 0,
    seconds: 0
  }
  vm.duration = {
    days: 0,
    hours: 2,
    minutes: 0
  }
  vm.calendar = {
    displayDate: moment(),
    displayWeeks: [],
    title: "",
    selected: moment()
  };
  vm.calendar.prevMonth = function(){
    vm.calendar.displayDate.subtract(1, 'months');
    vm.calendar.buildMonth();
  }
  vm.calendar.nextMonth = function(){
    vm.calendar.displayDate.add(1, 'months');
    vm.calendar.buildMonth();
  }
  vm.calendar.updateTitle = function(){
    vm.calendar.title = vm.calendar.displayDate.format('MMMM') + ", " +
      vm.calendar.displayDate.format('YYYY');
  }
  _createDay = function(dayMoment, displayDate){
    return {
      number: dayMoment.date(),
      inDisplayMonth: (dayMoment.month() === displayDate.month()),
      date: dayMoment
    }
  }

  vm.calendar.buildMonth = function(){
    vm.calendar.updateTitle();
    vm.calendar.displayWeeks = [];
    var firstOfMonth = moment(vm.calendar.displayDate).date(1);
    var firstDayOfMonth = firstOfMonth.day();

    // Generates First Week
    var week = [];
    var i = firstDayOfMonth-1;
    var dayMoment;
    while(i > 0){
      dayMoment = moment(firstOfMonth).subtract(i, 'days');
      var day = _createDay(dayMoment, vm.calendar.displayDate);
      week.push(day);
      i-=1;
    }
    i = 0;
    while(week.length < 7){
      dayMoment = moment(firstOfMonth).add(i, 'days');
      var day = _createDay(dayMoment, vm.calendar.displayDate);
      week.push(day);
      i+=1;
    }
    vm.calendar.displayWeeks.push(week);
    // Add other weeks
    while(dayMoment.month() === vm.calendar.displayDate.month()){
      //Add new week
      i = 0;
      week = [];
      while(i < 7){
        dayMoment = moment(dayMoment).add(1, 'days');
        var day = _createDay(dayMoment, vm.calendar.displayDate);
        week.push(day);
        i+=1;
      }
      vm.calendar.displayWeeks.push(week);
    }
  }
  vm.calendar.select = function(day){
    vm.calendar.selected = day.date;
    vm.date = vm.calendar.selected;
  }
  vm.calendar.buildMonth();
}
