const config = require('../config');

/**
 * Generate HTML email template for leave request notification to manager
 * @param {string} employeeName - Name of the employee requesting leave
 * @param {string} employeeEmail - Email of the employee
 * @param {string} managerName - Name of the manager
 * @param {string} leaveType - Type of leave (Sick, Casual, Annual, etc.)
 * @param {string} startDate - Start date of leave
 * @param {string} endDate - End date of leave
 * @param {string} reason - Reason for leave
 * @param {string} totalDays - Total number of leave days
 * @param {string} requestId - Unique request ID
 * @param {string} approvalLink - Link to approve/reject the request
 * @returns {string} - Complete HTML email template
 */
 const generateRequestEmailTemplate = (employeeName, employeeEmail, managerName, leaveType, startDate, endDate, reason) => {
    // Calculate total leave duration in hours or days

    startDate = new Date(startDate).toISOString().replace('T', ' ').slice(0, 16);
    endDate = new Date(endDate).toISOString().replace('T', ' ').slice(0, 16);
    

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end - start;
    const diffHours = diffMs / (1000 * 60 * 60);

    let totalDays;
    if (diffHours < 24) {
        totalDays = `${diffHours.toFixed(2)} Hour${diffHours === 1 ? '' : 's'}`;
    } else {
        const days = diffHours / 24;
        totalDays = `${days % 1 === 0 ? days : days.toFixed(2)} Day${days === 1 ? '' : 's'}`;
    }
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Leave Request - ${employeeName}</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 300;
            }
            .content {
                padding: 40px 30px;
            }
            .request-info {
                background-color: #f8f9fa;
                border: 2px solid #e9ecef;
                border-radius: 8px;
                padding: 25px;
                margin: 25px 0;
            }
            .info-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid #dee2e6;
            }
            .info-item:last-child {
                border-bottom: none;
            }
            .info-label {
                font-weight: 600;
                color: #495057;
                font-size: 16px;
            }
            .info-value {
                font-weight: 500;
                color: #212529;
                font-size: 16px;
            }
            .reason-box {
                background-color: #e3f2fd;
                border-left: 4px solid #2196f3;
                padding: 20px;
                margin: 20px 0;
                border-radius: 0 6px 6px 0;
            }
            .reason-box h4 {
                margin: 0 0 10px 0;
                color: #1976d2;
            }
            .action-buttons {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin: 30px 0;
                flex-wrap: wrap;
            }
            .action-button {
                display: inline-block;
                color: white;
                text-decoration: none;
                padding: 15px 30px;
                border-radius: 25px;
                font-weight: 600;
                text-align: center;
                transition: transform 0.2s ease;
                min-width: 120px;
            }
            .approve-btn {
                background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
            }
            .reject-btn {
                background: linear-gradient(135deg, #e17055 0%, #d63031 100%);
            }
            .action-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            .urgent-notice {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 6px;
                padding: 15px;
                margin: 20px 0;
                color: #856404;
            }
            .urgent-notice h4 {
                margin: 0 0 10px 0;
                color: #856404;
            }
            .footer {
                background-color: #f8f9fa;
                padding: 20px 30px;
                text-align: center;
                color: #6c757d;
                font-size: 14px;
            }
            .request-id {
                background-color: #e9ecef;
                padding: 8px 12px;
                border-radius: 4px;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                color: #6c757d;
                margin-top: 10px;
            }
            .days-highlight {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: bold;
                font-size: 18px;
            }
            .employee-details {
                background-color: #f1f3f4;
                border-radius: 6px;
                padding: 15px;
                margin: 15px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📅 Leave Request</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">HRMS Portal - Leave Management</p>
            </div>
            
            <div class="content">
                <div style="font-size: 18px; margin-bottom: 30px; color: #2c3e50;">
                    <h2>Hello ${managerName},</h2>
                    <p>You have received a new leave request from one of your team members.</p>
                </div>

                <div class="employee-details">
                    <h3 style="margin: 0 0 15px 0; color: #495057;">👤 Employee Details</h3>
                    <div class="info-item">
                        <span class="info-label">Employee Name:</span>
                        <span class="info-value">${employeeName}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Email:</span>
                        <span class="info-value">${employeeEmail}</span>
                    </div>
                </div>

                <div class="request-info">
                    <h3 style="margin: 0 0 20px 0; color: #495057; text-align: center;">📋 Leave Request Details</h3>
                    // <div class="info-item">
                    //     <span class="info-label">Leave Type:</span>
                    //     <span class="info-value">${leaveType}</span>
                    // </div>
                    <div class="info-item">
                        <span class="info-label">Start Date:</span>
                        <span class="info-value">${startDate}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">End Date:</span>
                        <span class="info-value">${endDate}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Total Days:</span>
                        <span class="info-value">
                            <span class="days-highlight">
                                ${
                                    totalDays
                                }
                            </span>
                        </span>
                    </div>
                </div>

                <div class="reason-box">
                    <h4>📝 Reason for Leave:</h4>
                    <p style="margin: 0; font-style: italic; color: #424242;">"${reason}"</p>
                </div>

                <div class="urgent-notice">
                    <h4>⏰ Action Required</h4>
                    <p>Please review this leave request and take appropriate action. The employee is waiting for your approval.</p>
                </div>



                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
                    <h4 style="margin: 0 0 15px 0; color: #495057;">💡 Manager Guidelines:</h4>
                    <ul style="margin: 0; color: #6c757d;">
                        <li>Review the leave request against team workload and project deadlines</li>
                        <li>Check if the employee has sufficient leave balance</li>
                        <li>Consider the impact on team productivity</li>
                        <li>Ensure proper handover arrangements if needed</li>
                        <li>Respond within 24-48 hours for better employee experience</li>
                    </ul>
                </div>
            </div>

            <div class="footer">
                <p>This is an automated notification from HRMS Portal.</p>
                <p>If you have any questions, please contact the HR department.</p>
                <p>&copy; 2024 HRMS Portal. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};


module.exports = { generateRequestEmailTemplate };