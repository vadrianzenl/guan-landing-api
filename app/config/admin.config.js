const AdminBro = require('admin-bro');
const AdminBroSequelize = require('admin-bro-sequelizejs');
const AdminBroExpressjs = require('admin-bro-expressjs');
const bcrypt = require('bcrypt');

module.exports = (app, db) => {
    AdminBro.registerAdapter(AdminBroSequelize);
    const canModifyUsers = ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin';
    const adminBro = new AdminBro({
        databases: [db],
        resources:[{
            resource: db.user,
            options: {
                properties: {
                    encryptedPassword: { isVisible: false },
                    password: {
                        type: 'string',
                        isVisible: {
                            list: false, edit: true, filter: false, show: false,
                        },
                    },
                },
                actions: {
                    new: {
                        before: async (request) => {
                            if(request.payload.record.password) {
                                request.payload.record = {
                                    ...request.payload.record,
                                    encryptedPassword: await bcrypt.hash(request.payload.record.password, 10),
                                    password: undefined,
                                }
                            }
                            return request
                        },
                    },
                    edit: { isAccessible: canModifyUsers },
                    delete: { isAccessible: canModifyUsers },
                    new: { isAccessible: canModifyUsers },
                }
            }
        }],
        rootPath: '/admin'
    });
    //const router = AdminBroExpressjs.buildRouter(adminBro);
    const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
        authenticate: async (email, password) => {
            const user = await db.user.findOne({ where: { email: email } });
            if (user) {
                const matched = await bcrypt.compare(password, user.encryptedPassword);
                if (matched) {
                    return user
                }
            }
            return false
        },
        cookiePassword: 'some-secret-password-used-to-secure-cookie',
    });
    app.use(adminBro.options.rootPath, router);
};
