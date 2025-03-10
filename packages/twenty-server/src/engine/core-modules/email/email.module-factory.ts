import {
  EmailDriver,
  EmailModuleOptions,
} from 'src/engine/core-modules/email/interfaces/email.interface';

import { EnvironmentService } from 'src/engine/core-modules/environment/environment.service';

export const emailModuleFactory = (
  environmentService: EnvironmentService,
): EmailModuleOptions => {
  const driver = environmentService.get('EMAIL_DRIVER');

  switch (driver) {
    case EmailDriver.Logger:
      return {};

    case EmailDriver.Smtp: {
      const options: EmailModuleOptions = {};

      const host = environmentService.get('EMAIL_SMTP_HOST');
      const port = environmentService.get('EMAIL_SMTP_PORT');
      const user = environmentService.get('EMAIL_SMTP_USER');
      const pass = environmentService.get('EMAIL_SMTP_PASSWORD');
      const noTLS = environmentService.get('EMAIL_SMTP_NO_TLS');

      if (!host || !port) {
        throw new Error(
          `${driver} email driver requires host and port to be defined, check your .env file`,
        );
      }

      options.host = host;
      options.port = port;

      if (user && pass) options.auth = { user, pass };

      if (noTLS) {
        options.secure = false;
        options.ignoreTLS = true;
      }

      return options;
    }

    default:
      throw new Error(`Invalid email driver (${driver}), check your .env file`);
  }
};
