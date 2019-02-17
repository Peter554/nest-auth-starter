import { Logger, BadRequestException } from '@nestjs/common';

export const enforceHttps = (req, res, next) => {
    if (!req.secure) {
        throw new BadRequestException('Request is not secure.');
    }
    next();
};
