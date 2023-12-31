import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToString'
})
export class DateToStringPipe implements PipeTransform {

  transform(time: number): string {
    const todaysTime: number = new Date().getTime() / 1000
    let secondsDifference: number = todaysTime - time

    const secondsInAYear = 365 * 24 * 60 * 60
    let years = Math.floor(secondsDifference / secondsInAYear)
    secondsDifference -= years * secondsInAYear

    const secondsInAMonth = 30 * 24 * 60 * 60
    let months = Math.floor(secondsDifference / secondsInAMonth)
    secondsDifference -= months * secondsInAMonth

    const secondsInADay = 24 * 60 * 60
    let days = Math.floor(secondsDifference / secondsInADay)
    secondsDifference -= days * secondsInADay

    const secondsInAnHour = 60 * 60
    let hours = Math.floor(secondsDifference / secondsInAnHour)
    secondsDifference -= hours * secondsInAnHour

    const secondsInAMinute = 60
    let minutes = Math.floor(secondsDifference / secondsInAMinute)
    secondsDifference -= minutes * secondsInAMinute

    return `${years != 0 ? ` ${years} years` :
      `${months != 0 ? ` ${months} months` :
        `${days != 0 ? `${days} days` :
          `${hours != 0 ? ` ${hours} hours` :
            `${minutes != 0 ? ` ${minutes} minutes ` :
              `${secondsDifference} seconds`}`}`}`}`} ago`
  }

}
