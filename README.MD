# MUBCO Assessment Project

## Installation

```bash
 git clone https://github.com/kcansari/MUBCO-assessment-project.git
```

## Node Library Dependencies

The dependencies for the project should be downloaded using the
`npm` command-line tool. You can get this tool by `downloading [Node.js](https://nodejs.org/en/download). Make sure to choose the correct option for your operating system.

Once the installation is complete, you may need to restart your computer before
using the command line tools. You can test that it's installed by running the
following command:

```bash
 node -v
```

This should print out the version of `node` you currently have - I recommend using the latest Long Term Support version, currently 16.17.10, so this command should print something like
`v18.13.0`.

Once `npm` is installed, you can install the project dependencies by running the following command from the root directory:

```bash
 npm install
```

You must run this from the top level of the project, so `npm` has access to the **package.json** file where the dependencies are.

## Running the Application

In order for the application to use Atlas, you will need a file called .env to contain the connection information. In the project directory you can find two files, dotenv_unix (for Unix users) and dotenv_win (for Windows users).

Open the file for your chosen operating system and enter your Atlas SRV connection string as directed in the comment. This is the information the driver will use to connect. Make sure not to wrap your Atlas SRV connection between quotes:

```bash
 MONGO_URI = mongodb+srv://...
```

It's highly suggested you also change the **JWT_SECRET** to some very long, very random string.

```bash
JWT_SECRET = super_secret_key_you_should_change
```

When you've edited the file, rename it to .env with the following command:

```bash
 mv dotenv_unix .env  # on Unix
 ren dotenv_win .env  # on Windows
```

The application is programmed
to run on port **5000** by default - if you need to run on a port other than
5000, you can edit the **dotenv_win** (if on Windows) or the **dotenv_unix** file
(if on Linux or Mac) in the root directory to modify the value of **PORT**.

In the project directory, run the following commands:

```bash
# start the project
npm run server
```

## Import or Destroy Sample Data

There are sample data in seeder.js file so as to implement or destroy, you can use these:

```bash
# import data
npm run data:import

#destroy data
npm run data:destroy
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
