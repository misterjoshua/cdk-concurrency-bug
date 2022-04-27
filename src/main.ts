import { App, Stack } from 'aws-cdk-lib';
import { ContainerImage, FargateTaskDefinition } from 'aws-cdk-lib/aws-ecs';

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

const stack = new Stack(app, 'cdk-concurrency-bug', { env: devEnv });

for (let i = 0; i < 30; i++) {
  const task = new FargateTaskDefinition(stack, `Task${i}`, {});
  task.addContainer('asset', {
    image: ContainerImage.fromAsset(__dirname, {
      buildArgs: {
        VAR: `var-${i}`,
      },
    }),
  });
}

app.synth();