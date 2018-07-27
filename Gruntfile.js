module.exports = function(grunt) {

    var authParams = {
        host: 'sbt-oopp-009.sigma.sbrf.ru',
        port: 22,
        authKey: 'key1'
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        stylus: {
            compile: {
                files: {
                    'public/main.css': ['src/**/**.styl']
                }
            }
        },
        'sftp-deploy': {
            build: {
                auth: authParams,
                src: ['build/dist/'],
                dest: '/hwz/BOBJROOT/LumiraWebApp/zen/mimes/global/Root Folder/_fin/db_driver/tech0/build/dist/',
                serverSep: '/',
                localSep: '/',
                concurrency: 4,
                progress: true
            },
            pub: {
                auth: authParams,
                src: ['public/'],
                dest: '/hwz/BOBJROOT/LumiraWebApp/zen/mimes/global/Root Folder/_fin/db_driver/tech0/public',
                serverSep: '/',
                localSep: '/',
                concurrency: 4,
                progress: true
            },
            api: {
                auth: authParams,
                src: ['api/'],
                dest: '/hwz/BOBJROOT/LumiraWebApp/zen/mimes/global/Root Folder/_fin/db_driver/tech0/api',
                serverSep: '/',
                localSep: '/',
                concurrency: 4,
                progress: true
            },
        },
        gitcommit: {
            your_target: {
                options: {
                    branch: 'Volchanskiy'
                },
                files: {
                    src: ['src/**/*', 'public/**/*', 'api/**/*', '!src/secret', '!src/secret/data_bank.js']
                }
            }
        },
        gitpush: {
            your_target: {
                options: {
                    branch: 'Volchanskiy'
                }
            }
        },
        watch: {
            styl: {
                files: ['src/**/**.styl'],
                tasks: ['stylus']
            },
            // _build: {
            //     files: ['build/dist/*.js'],
            //     tasks: ['sftp-deploy']
            // },
            // _public: {
            //     files: ['public/*.css'],
            //     tasks: ['sftp-deploy']
            // },
            // _api: {
            //     files: ['api/*'],
            //     tasks: ['sftp-deploy']
            // },
            // _git: {
            //     files: ['src/**/**', 'public/**/*', 'api/**/*'],
            //     tasks: ['gitcommit', 'gitfetch', 'gitpush']
            // }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-sftp-deploy');
    grunt.loadNpmTasks('grunt-git');

    grunt.registerTask('default', ['watch', 'stylus']);
    console.log("**************************");
    console.log("Команды:");
    console.log("npm run git ------ Залить в реп.");
    console.log("npm run c -------- Сделать commit в реп.");
    console.log("npm run p -------- Сделать push в реп.");
    console.log("npm run f -------- Сделать fetch в реп.");
    console.log("npm run ftp ------ Залить на ftps.");
    console.log("npm start -------- Запустить режим отладки интерфейса.");
    console.log("npm run build ---- Создать продуктивную сборку.");
    console.log("npm run test ----- Тестировать сборку.");
    console.log("npm run docs ----- Генерация документации.");
    console.log("npm run docsDev -- Сервер документации.");
    console.log("**************************");
};
