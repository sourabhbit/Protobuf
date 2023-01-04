import protobuf from "protobufjs";

export const encodePayloadProtobuf = async (reqObj?: any) => {
  const root = await protobuf.load("identity.proto");
  const AwesomeMessage = root.lookupType("stablemoney.InitiateAuthRequest");
  let message = AwesomeMessage.create(reqObj);
  //   console.log(`message = ${JSON.stringify(message)}`);

  let buffer = AwesomeMessage.encode(message).finish();
  //   let decoded = AwesomeMessage.decode(buffer);
  //   console.log(`decoded = ${JSON.stringify(decoded)}`);
  //   console.log(`buffer = ${Array.prototype.toString.call(buffer)}`);
  return buffer;
};

export const decodeResponseProtobuf = async (buffer: any) => {
  const root = await protobuf.load("identity.proto");
  const AwesomeMessage = root.lookupType(
    "stablemoney.RespondToAuthChallengeResponse"
  );
  const uint8 = new Uint8Array(buffer);
  //   console.log(uint8);
  let decoded = AwesomeMessage.decode(uint8);
  return JSON.parse(JSON.stringify(decoded));
};
