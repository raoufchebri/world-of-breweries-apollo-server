import { RESTDataSource } from "apollo-datasource-rest";
import * as nodemailer from "nodemailer";

const BREWERY_API_URL = "https://api.openbrewerydb.org/breweries";

interface Props {
  name: string;
  city: string;
  type: string;
  postal: string;
}

export class BreweryAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = BREWERY_API_URL;
  }
  async withParams(name: string, city: string, type: string, postal: string) {
    const props: Props = { name, city, type, postal: postal };
    const query = this.generateQueryWithProps(props);
    return await this.get(query);
  }

  /**
   *
   * @param props is an object with properties
   * @returns returns a REST API formatted query that constructed using the object props
   * @example props = {name: 'someName', city: 'someCity'} returns query = '?name=someName&city=someCity'
   */
  private generateQueryWithProps(props: Props) {
    let query = "";
    Object.entries(props).forEach(([key, value]) => {
      const filter: string = `by_${key}=${value}`;

      if (value && value !== "") {
        if (query === "") {
          query = `?${filter}`;
        } else {
          query += `&${filter}`;
        }
      }
    });
    return query;
  }

  async withId(id: number) {
    return await this.get(`/${id}`);
  }

  async sendEmail(
    name: string,
    address: string,
    email: string,
    phone: string,
    brewery_type: string,
    comment: string
  ) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "jermaine77@ethereal.email", // generated ethereal user
        pass: "23huRZkAy3r8UdRbcT", // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Nodemailer 👻" <raouf@chebri.com>', // sender address
      to: "raouf.chebri@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `
        Application request from: ${name}
        address: ${address}
        email: ${email}
        phone: ${phone}
        brewery_type: ${brewery_type}
        comment: ${comment}
      `, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    return "ok";
  }
}

export const dataSources = () => ({ breweryAPI: new BreweryAPI() });
