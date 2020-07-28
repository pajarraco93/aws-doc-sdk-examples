/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with Version 3 (V3) of the AWS SDK for JavaScript,
which is scheduled for release later in 2020. The prerelease version of the SDK is available
at https://github.com/aws/aws-sdk-js-v3. The 'SDK for JavaScript Developer Guide' for V3 is also
scheduled for release later in 2020, and the topic containing this example will be hosted at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/cloudwatch-examples-using-alarm-actions.html.

Purpose:
cw_enablealarmactions.js demonstrates how to enable actions for Amazon CloudWatch alarms.

Inputs (replace in code):
- REGION
- ALARM_NAME
- ACTION_ARN

Running the code:
node cw_enablealarmactions.js
*/
// snippet-start:[cw.JavaScript.alarms.enableAlarmActionsV3]

// Import required AWS SDK clients and commands for Node.js
const {
  CloudWatch,
  PutMetricAlarmCommand,
  EnableAlarmActionsCommand,
} = require("@aws-sdk/client-cloudwatch");

// Set the AWS Region
const REGION = "REGION"; //e.g. "us-east-1"

// Set the parameters
const params = {
  AlarmName: "ALARM_NAME", //ALARM_NAME
  ComparisonOperator: "GreaterThanThreshold",
  EvaluationPeriods: 1,
  MetricName: "CPUUtilization",
  Namespace: "AWS/EC2",
  Period: 60,
  Statistic: "Average",
  Threshold: 70.0,
  ActionsEnabled: true,
  AlarmActions: ["ACTION_ARN"], //e.g., "arn:aws:automate:us-east-1:ec2:stop"
  AlarmDescription: "Alarm when server CPU exceeds 70%",
  Dimensions: [
    {
      Name: "InstanceId",
      Value: "INSTANCE_ID",
    },
  ],
  Unit: "Percent",
};

// Create CloudWatch service object
const cw = new CloudWatch(REGION);

const run = async () => {
  try {
    const data = await cw.send(new PutMetricAlarmCommand(params));
    console.log("Alarm action added; RequestID:", data.$metadata.requestId);
    var paramsEnableAlarmAction = {
      AlarmNames: [params.AlarmName],
    };
    try {
      const data = await cw.send(
        new EnableAlarmActionsCommand(paramsEnableAlarmAction)
      );
      console.log("Alarm action enabled; RequestID:", data.$metadata.requestId);
    } catch (err) {
      console.log("Error", err);
    }
  } catch (err) {
    console.log("Error", err);
  }
};
run();
// snippet-end:[cw.JavaScript.alarms.enableAlarmActionsV3]
exports.run = run;
