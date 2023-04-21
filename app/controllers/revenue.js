/** @format */

const Revenue = require("../models/revenue");
const revenues = new Revenue();
const getRevenueIntervalSixMonth = async (req, res) => {
  try {
    const { sellerId } = req.query;
    const results = await revenues.getRevenueIntervalSixMonth(sellerId);
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const getRevenueInMonth = async (req, res) => {
  try {
    const { sellerId, month, year } = req.query;
    const currentDate = new Date();
    const isCurrentMonth = parseInt(month) === currentDate.getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    const numDays = isCurrentMonth ? currentDate.getDate() : daysInMonth;
    const results = await revenues.getRevenueInMonth(sellerId, month, year);
    console.log(results);
    const formattedResults = Array.from({ length: daysInMonth }, (_, i) => {
      const date = i + 1;

      const revenueObj = results.find((result) => {
        return result.date === date;
      });

      const revenue = revenueObj ? parseFloat(revenueObj.revenue) : 0;
      return {
        year: year,
        month: monthNames[parseInt(month) - 1],
        date,
        revenue,
      };
    }).slice(0, numDays);
    res.status(200).json({
      success: true,
      data: formattedResults,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRevenueAllWeekInYear = async (req, res) => {
  try {
    const { sellerId, year } = req.query;
    const results = await revenues.getRevenueAllWeekInYear(sellerId, year);
    // console.log(results);
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRevenueMonthOfYear = async (req, res) => {
  try {
    const { sellerId, year } = req.query;
    const results = await revenues.getRevenueMonthOfYear(sellerId, year);
    let data = [];
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();

    let monthLength =
      currentYear === parseInt(year)
        ? currentDate.getMonth() + 1
        : currentYear < parseInt(year)
        ? 0
        : 12;

    for (let month = 0; month < monthLength; month++) {
      let flag = 0;
      for (let index = 0; index < results.length; index++) {
        if (month + 1 === results[index].month) {
          flag = 1;
          data.push({
            year: year,
            month: monthNames[month],
            revenue: parseFloat(results[index].revenue),
          });
          break;
        }
      }
      if (!flag)
        data.push({
          year: year,
          month: monthNames[month],
          revenue: 0.0,
        });
    }
    console.log(data);
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRevenueIntervalSixMonth,
  getRevenueInMonth,
  getRevenueAllWeekInYear,
  getRevenueMonthOfYear,
};
