// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/56295f5058cac7ae458540423c50ac2dcf9fc711/passport-local/passport-local.d.ts
// Type definitions for passport-local 1.0.0
// Project: https://github.com/jaredhanson/passport-local
// Definitions by: Maxime LUCE <https://github.com/SomaticIT>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


declare module 'passport-local' {

    import passport = require('passport');
    import express = require('express');

    interface IStrategyOptions {
        usernameField?: string;
        passwordField?: string;
        passReqToCallback?: boolean;
    }

    interface IStrategyOptionsWithRequest {
        usernameField?: string;
        passwordField?: string;
        passReqToCallback: boolean;
    }

    interface IVerifyOptions {
        message: string;
    }

    interface VerifyFunctionWithRequest {
        (req: express.Request, username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void): void;
    }

    interface VerifyFunction {
        (username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void): void;
    }

    class Strategy implements passport.Strategy {
        constructor(options: IStrategyOptionsWithRequest, verify: VerifyFunctionWithRequest);
        constructor(options: IStrategyOptions, verify: VerifyFunction);
        constructor(verify: VerifyFunction);

        name: string;
        authenticate: (req: express.Request, options?: Object) => void;
    }
}